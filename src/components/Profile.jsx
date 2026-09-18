import React, { useState, useRef, useEffect } from 'react';
import { colors, typography, spacing } from '../design/tokens';
import { cardStyles, inputStyles } from '../design/components';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import Avatar from './ui/Avatar';
import { parseLocalDate } from '../utils/localDate';
import { fileToAvatarDataUrl } from '../utils/avatarImage';
import { deleteAccount } from '../services/accountService';

const StatCard = ({ label, value, total }) => (
  <div
    aria-label={`${label}: ${value}${total ? ` of ${total}` : ''}`}
    style={{
      ...cardStyles.base,
      textAlign: 'center',
      padding: spacing.md,
    }}
  >
    <div style={{
      fontSize: typography.sizes['2xl'],
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
      lineHeight: 1.2,
    }}>
      {value}{total ? <span style={{ fontSize: typography.sizes.md, color: colors.text.muted }}>/{total}</span> : ''}
    </div>
    <div style={{
      fontSize: typography.sizes.xs,
      color: colors.text.tertiary,
      marginTop: '4px',
      textTransform: 'uppercase',
      letterSpacing: typography.letterSpacing.wider,
    }}>
      {label}
    </div>
  </div>
);

// `value` is the raw value saved to Firestore (and fed to the edit input);
// `displayValue` optionally overrides what read mode shows (e.g. the Test Date
// field displays "August 22, 2026" while `value` stays the YYYY-MM-DD the
// <input type="date"> and users/{uid}.testDate contract require).
const EditableField = ({ label, value, onSave, type = 'text', min, max, displayValue }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async () => {
    if (type === 'number') {
      // Guard the parseInt('') === NaN path — a cleared field must never
      // save NaN to Firestore (it renders as "your NaN goal" downstream).
      const n = parseInt(draft, 10);
      if (!Number.isFinite(n)) {
        setErrorMsg('Enter a number.');
        return;
      }
      if ((Number.isFinite(min) && n < min) || (Number.isFinite(max) && n > max)) {
        setErrorMsg(
          Number.isFinite(min) && Number.isFinite(max)
            ? `Enter a number between ${min} and ${max}.`
            : 'That number is out of range.'
        );
        return;
      }
    }
    setSaving(true);
    setErrorMsg('');
    try {
      await onSave(type === 'number' ? parseInt(draft, 10) : draft);
      setEditing(false);
    } catch {
      setErrorMsg("Couldn't save — try again.");
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
          <input
            type={type}
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setErrorMsg(''); }}
            min={min}
            max={max}
            style={{ ...inputStyles.base, height: '40px', fontSize: typography.sizes.sm, flex: 1 }}
            autoFocus
            aria-label={label}
          />
          <Button onClick={handleSave} disabled={saving} variant="primary" size="sm">
            {saving ? '...' : 'Save'}
          </Button>
          <Button onClick={() => { setEditing(false); setDraft(value || ''); setErrorMsg(''); }} variant="ghost" size="sm">
            Cancel
          </Button>
        </div>
        {errorMsg && (
          <p role="alert" style={{ fontSize: typography.sizes.xs, color: colors.semantic.error, marginTop: spacing.xs, marginBottom: 0 }}>
            {errorMsg}
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: typography.sizes.xs, color: colors.text.tertiary, marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: typography.sizes.base, color: colors.text.primary, fontWeight: typography.weights.medium }}>
          {displayValue || value || 'Not set'}
        </div>
      </div>
      <Button
        onClick={() => { setErrorMsg(''); setEditing(true); }}
        variant="tertiary"
        size="sm"
      >
        Edit
      </Button>
    </div>
  );
};

const Profile = ({
  user,
  onLogout,
  onUpdateTargetScore,
  onUpdateTestDate,
  onUpdateCurrentScore,
  onUpdateTargetSchools,
  onUpdateProfilePhoto,
  onUpdateFirstName,
  completedLessons = {},
  practiceTestResults = {},
  skillProgress = {},
  allLessonsCount = 205,
  entitlement = null,
  onSubscribe = null,
  onManageBilling = null,
  // 'goals' scrolls the SAT Goals card into view on mount — the landing for
  // "Raise your target" / "Update your test date" from the score surfaces.
  initialFocus = null,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  useEffect(() => {
    if (initialFocus !== 'goals') return;
    const el = document.getElementById('profile-sat-goals');
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [initialFocus]);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const fileInputRef = useRef(null);

  const handlePhotoPick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-picking the same file
    if (!file || !onUpdateProfilePhoto) return;
    setPhotoBusy(true);
    setPhotoError('');
    try {
      const dataUrl = await fileToAvatarDataUrl(file);
      await onUpdateProfilePhoto(dataUrl);
    } catch (err) {
      setPhotoError(err?.message || 'Could not update photo.');
    } finally {
      setPhotoBusy(false);
    }
  };

  const handlePhotoRemove = async () => {
    if (!onUpdateProfilePhoto) return;
    setPhotoBusy(true);
    setPhotoError('');
    try {
      await onUpdateProfilePhoto(null);
    } catch (err) {
      setPhotoError(err?.message || 'Could not remove photo.');
    } finally {
      setPhotoBusy(false);
    }
  };

  const closeDeleteModal = () => {
    if (deleting) return; // block Escape/backdrop close while the request runs
    setShowDeleteModal(false);
    setDeleteConfirmText('');
    setDeleteError('');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE' || deleting) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await deleteAccount();
      // Server has removed the Auth record; sign out + route to landing.
      onLogout();
    } catch (err) {
      setDeleteError(err?.message || 'Could not delete your account. Please try again.');
      setDeleting(false);
    }
  };

  const testsCompleted = Object.keys(practiceTestResults).length;
  const lessonsCompleted = Object.keys(completedLessons).length;
  const skillsMastered = Object.values(skillProgress).filter(s => (s.correct / Math.max(s.attempts, 1)) >= 0.8).length;
  const totalSkills = 76;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set';
    try {
      // parseLocalDate: 'YYYY-MM-DD' must parse as LOCAL midnight — UTC
      // parse displayed the previous day in negative-offset timezones.
      const d = parseLocalDate(dateStr);
      return d ? d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: `${spacing.xl} ${spacing.lg}`,
      fontFamily: typography.fontFamily,
    }}>
      {/* Avatar & Name */}
      <div style={{ textAlign: 'center', marginBottom: spacing['2xl'] }}>
        <div style={{ display: 'inline-block', margin: '0 auto', marginBottom: spacing.md }}>
          <Avatar
            user={user}
            size={88}
            background={`linear-gradient(135deg, ${colors.accent.orange}, ${colors.accent.orangeHover})`}
            fontSize={32}
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoPick}
          style={{ display: 'none' }}
          aria-label="Choose a profile photo"
        />
        <div style={{ display: 'flex', justifyContent: 'center', gap: spacing.xs, marginBottom: spacing.sm }}>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="tertiary"
            size="sm"
            disabled={photoBusy}
          >
            {photoBusy ? 'Saving...' : user?.photoDataUrl ? 'Change photo' : 'Add a photo'}
          </Button>
          {user?.photoDataUrl && !photoBusy && (
            <Button onClick={handlePhotoRemove} variant="ghost" size="sm">
              Remove
            </Button>
          )}
        </div>
        {photoError && (
          <p role="alert" style={{ fontSize: typography.sizes.xs, color: colors.semantic.error, marginBottom: spacing.sm }}>
            {photoError}
          </p>
        )}
        <h1 style={{
          fontSize: typography.sizes.xl,
          fontWeight: typography.weights.bold,
          color: colors.text.primary,
          marginBottom: '4px',
        }}>
          {user?.firstName || 'Student'}
        </h1>
        {/* ph-no-capture: keep the email out of PostHog session replays */}
        <p className="ph-no-capture" style={{
          fontSize: typography.sizes.sm,
          color: colors.text.tertiary,
        }}>
          {user?.email}
        </p>
      </div>

      {/* About You */}
      <div style={{ marginBottom: spacing.xl }}>
        <h2 style={{
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.semibold,
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wider,
          marginBottom: spacing.md,
        }}>
          About You
        </h2>
        <div style={{ ...cardStyles.base }}>
          <EditableField
            label="What should we call you?"
            value={user?.firstName}
            onSave={onUpdateFirstName}
          />
        </div>
      </div>

      {/* SAT Goals */}
      <div id="profile-sat-goals" style={{ marginBottom: spacing.xl, scrollMarginTop: '96px' }}>
        <h2 style={{
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.semibold,
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wider,
          marginBottom: spacing.md,
        }}>
          SAT Goals
        </h2>
        <div style={{ ...cardStyles.base, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          <EditableField
            label="Target Score"
            value={user?.targetScore}
            onSave={onUpdateTargetScore}
            type="number"
            min={400}
            max={1600}
          />
          <div style={{ borderTop: `1px solid ${colors.surface.gray}` }} />
          <EditableField
            label="Current Score"
            value={user?.currentScore}
            onSave={onUpdateCurrentScore}
            type="number"
            min={400}
            max={1600}
          />
          <div style={{ borderTop: `1px solid ${colors.surface.gray}` }} />
          <EditableField
            label="Test Date"
            value={user?.testDate || ''}
            displayValue={formatDate(user?.testDate)}
            onSave={onUpdateTestDate}
            type="date"
          />
          {Array.isArray(user?.testDates) && user.testDates.length > 1 && (
            <div style={{ fontSize: typography.sizes.xs, color: colors.text.tertiary, marginTop: '-6px' }}>
              All your dates: {user.testDates.map(formatDate).join(' · ')} — this field edits the next one; manage the full list from Home.
            </div>
          )}
          <div style={{ borderTop: `1px solid ${colors.surface.gray}` }} />
          <EditableField
            label="Target Schools"
            value={user?.targetSchools?.map(s => s?.name || 'Unknown').join(', ') || 'Not set'}
            onSave={(val) => onUpdateTargetSchools(val.split(',').map(s => ({ name: s.trim() })))}
          />
        </div>
      </div>

      {/* Progress Summary */}
      <div style={{ marginBottom: spacing.xl }}>
        <h2 style={{
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.semibold,
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wider,
          marginBottom: spacing.md,
        }}>
          Progress
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm }}>
          <StatCard label="Tests Taken" value={testsCompleted} total={12} />
          <StatCard label="Lessons Done" value={lessonsCompleted} total={allLessonsCount} />
          <StatCard label="Skills Mastered" value={skillsMastered} total={totalSkills} />
          <StatCard label="Best Score" value={
            Object.values(practiceTestResults).reduce((best, t) => {
              // attempts[] is NEWEST-first after Firestore hydration, so the
              // legacy fallback must take the max — attempts[0] is the LATEST
              // score, not the best. Math.max(0, ...[]) === 0 covers empty.
              const score = t.bestScaledScore || Math.max(0, ...(t.attempts || []).map(a => a?.scaledScore || 0));
              return Math.max(best, score);
            }, 0) || '--'
          } />
        </div>
      </div>

      {/* Membership (SEVA Premium) — hidden while billing is dark */}
      {entitlement?.flagEnabled && (
        <div style={{ marginBottom: spacing.xl }}>
          <h2 style={{
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.semibold,
            color: colors.text.tertiary,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wider,
            marginBottom: spacing.md,
          }}>
            Membership
          </h2>
          <div style={{ ...cardStyles.base, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                {entitlement.phase === 'comped' && 'Free access'}
                {entitlement.phase === 'premium' && `SEVA Premium — ${entitlement.plan === 'annual' ? 'Annual' : 'Monthly'}`}
                {entitlement.phase === 'ending' && 'SEVA Premium — ending soon'}
                {entitlement.phase === 'grace' && 'SEVA Premium — payment issue'}
                {entitlement.phase === 'trial' && 'Free trial'}
                {(entitlement.phase === 'expired' || entitlement.phase === 'none') && 'No active plan'}
                {entitlement.loading && 'Checking your plan…'}
              </p>
              <p style={{ margin: `${spacing.xs} 0 0`, fontSize: typography.sizes.sm, color: colors.text.muted }}>
                {entitlement.phase === 'premium' && entitlement.endsAtMs && `Renews ${new Date(entitlement.endsAtMs).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`}
                {entitlement.phase === 'ending' && entitlement.endsAtMs && `Premium until ${new Date(entitlement.endsAtMs).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`}
                {entitlement.phase === 'grace' && 'Update your card to keep access.'}
                {entitlement.phase === 'trial' && (entitlement.endsAtMs
                  ? `${entitlement.trialDaysLeft} day${entitlement.trialDaysLeft === 1 ? '' : 's'} left — you won't be charged until ${new Date(entitlement.endsAtMs).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}. Cancel anytime before then.`
                  : `${entitlement.trialDaysLeft} day${entitlement.trialDaysLeft === 1 ? '' : 's'} left — cancel anytime before you're charged.`)}
                {entitlement.phase === 'comped' && 'Complimentary access — thanks for being an early SEVA user. You won’t be charged.'}
                {entitlement.phase === 'none' && 'Start your 3-day free trial to unlock tests, drills, and the AI tutor.'}
                {entitlement.phase === 'expired' && 'Subscribe to unlock tests, drills, and the AI tutor.'}
              </p>
            </div>
            {!entitlement.loading && entitlement.phase !== 'comped' && (() => {
              // Never-subscribed / lapsed → route to the paywall (Checkout);
              // a live billing account (trial/premium/ending/grace) → Portal.
              // Comped (grandfathered) users get no CTA — nothing to buy.
              const needsCheckout = entitlement.phase === 'none' || entitlement.phase === 'expired';
              if (!needsCheckout && entitlement.hasBillingAccount && onManageBilling) {
                return (
                  <Button onClick={onManageBilling} variant="secondary">
                    Manage billing
                  </Button>
                );
              }
              if (onSubscribe) {
                return (
                  <Button onClick={onSubscribe} variant="primary">
                    {entitlement.phase === 'none' ? 'Start free trial' : 'Subscribe'}
                  </Button>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}

      {/* Logout */}
      <div style={{ marginTop: spacing['2xl'] }}>
        {showLogoutConfirm ? (
          <div style={{
            ...cardStyles.base,
            textAlign: 'center',
            borderColor: colors.semantic.error,
          }}>
            <p style={{ fontSize: typography.sizes.base, color: colors.text.primary, marginBottom: spacing.md }}>
              Are you sure you want to log out?
            </p>
            <div style={{ display: 'flex', gap: spacing.sm, justifyContent: 'center' }}>
              <Button onClick={() => setShowLogoutConfirm(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={onLogout} variant="destructive">
                Log Out
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowLogoutConfirm(true)}
            variant="destructive"
            className="w-full"
            style={{ width: '100%', backgroundColor: 'transparent', color: colors.semantic.error, border: `1px solid ${colors.semantic.error}` }}
          >
            Log Out
          </Button>
        )}
      </div>

      {/* Danger Zone */}
      <div style={{ marginTop: spacing.xl }}>
        <h2 style={{
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.semibold,
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wider,
          marginBottom: spacing.md,
        }}>
          Danger Zone
        </h2>
        <div style={{ ...cardStyles.base }}>
          <div style={{
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.medium,
            color: colors.text.primary,
            marginBottom: '4px',
          }}>
            Delete account
          </div>
          <p style={{
            fontSize: typography.sizes.sm,
            color: colors.text.tertiary,
            marginBottom: spacing.md,
          }}>
            Permanently deletes your account, including all test results, study plans, and practice history. This cannot be undone.
          </p>
          <Button
            onClick={() => setShowDeleteModal(true)}
            variant="destructive"
            style={{ backgroundColor: 'transparent', color: colors.semantic.error, border: `1px solid ${colors.semantic.error}` }}
          >
            Delete account
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        title="Delete your account?"
        maxWidth="440px"
        footer={
          <div style={{ display: 'flex', gap: spacing.sm, justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={closeDeleteModal} variant="secondary" disabled={deleting}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              disabled={deleteConfirmText !== 'DELETE'}
              loading={deleting}
            >
              Delete account
            </Button>
          </div>
        }
      >
        <p style={{
          fontSize: typography.sizes.sm,
          color: colors.text.primary,
          marginBottom: spacing.md,
          lineHeight: 1.5,
        }}>
          This permanently deletes your account and removes all of your test results and study data. There is no way to recover it.
        </p>
        <label
          htmlFor="delete-account-confirm"
          style={{
            display: 'block',
            fontSize: typography.sizes.xs,
            color: colors.text.tertiary,
            marginBottom: spacing.xs,
          }}
        >
          Type DELETE to confirm
        </label>
        <input
          id="delete-account-confirm"
          type="text"
          value={deleteConfirmText}
          onChange={(e) => setDeleteConfirmText(e.target.value)}
          disabled={deleting}
          autoComplete="off"
          style={{ ...inputStyles.base, height: '40px', fontSize: typography.sizes.sm }}
          aria-label="Type DELETE to confirm account deletion"
        />
        {deleteError && (
          <p role="alert" style={{
            fontSize: typography.sizes.xs,
            color: colors.semantic.error,
            marginTop: spacing.sm,
            marginBottom: 0,
          }}>
            {deleteError}
          </p>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
