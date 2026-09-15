import React from 'react';
import * as Sentry from '@sentry/react';
import { colors, typography, spacing, radius } from '../../design/tokens';
import { Button } from './Button';

// A deploy rotates webpack chunk hashes, so a stale session's first lazy
// navigation after a deploy can 404 its chunk (ChunkLoadError). One reload
// picks up the fresh asset manifest and fixes it.
const CHUNK_RELOAD_FLAG = 'performsat:chunkReloadAttempted';

const isChunkLoadError = (error) =>
  !!error && (
    error.name === 'ChunkLoadError' ||
    /Loading chunk .* failed/.test(error.message || '')
  );

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // Safe no-op when Sentry.init never ran (no DSN configured).
    Sentry.captureException(error, {
      contexts: { react: { componentStack: errorInfo?.componentStack } },
    });

    if (isChunkLoadError(error)) {
      try {
        if (window.sessionStorage.getItem(CHUNK_RELOAD_FLAG) === '1') {
          // A reload was already attempted this session and the chunk still
          // failed — persistent outage, not a stale deploy. Clear the flag so
          // a FUTURE deploy can auto-recover again, and fall through to the
          // visible error UI (no reload loop).
          window.sessionStorage.removeItem(CHUNK_RELOAD_FLAG);
        } else {
          window.sessionStorage.setItem(CHUNK_RELOAD_FLAG, '1');
          window.location.reload();
        }
      } catch (storageError) {
        // sessionStorage unavailable (private mode / disabled): without the
        // guard we cannot rule out a reload loop, so don't auto-reload —
        // the error UI below offers a manual retry instead.
      }
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing['2xl'],
          textAlign: 'center',
          minHeight: '300px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: radius.full,
            backgroundColor: colors.semantic.errorLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.lg,
            fontSize: '28px',
          }}>
            !
          </div>
          <h2 style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.xl,
            fontWeight: typography.weights.semibold,
            color: colors.text.primary,
            marginBottom: spacing.xs,
            margin: 0,
          }}>
            Something went wrong
          </h2>
          <p style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.base,
            color: colors.text.secondary,
            marginBottom: spacing.lg,
            maxWidth: '400px',
          }}>
            {this.props.message || "We hit an unexpected error. Try refreshing, or come back in a moment."}
          </p>
          <Button
            onClick={this.handleRetry}
            variant="secondary"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
