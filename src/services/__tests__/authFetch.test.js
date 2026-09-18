/**
 * authFetch — emulator guard. Under `REACT_APP_USE_FIREBASE_EMULATOR` deployed
 * Cloud Function URLs must not be called (their 401s were logged on every
 * tutor panel open); local URLs still go through the normal path.
 */
jest.mock('../../firebase/config', () => ({
  auth: { currentUser: null },
  appCheckHeaders: async () => ({}),
}));

const load = (emulator) => {
  let mod;
  jest.isolateModules(() => {
    process.env.REACT_APP_USE_FIREBASE_EMULATOR = emulator ? '1' : '';
    mod = require('../authFetch');
  });
  return mod;
};

describe('authFetch under the emulator', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env.REACT_APP_USE_FIREBASE_EMULATOR;
  afterEach(() => { global.fetch = originalFetch; process.env.REACT_APP_USE_FIREBASE_EMULATOR = originalEnv; });

  test('a deployed URL gets a synthetic 503 and no network call', async () => {
    global.fetch = jest.fn();
    const info = jest.spyOn(console, 'info').mockImplementation(() => {});
    const { authFetch, functionsReachable } = load(true);
    expect(functionsReachable('https://aitutor-ki77ua6x2a-uc.a.run.app/')).toBe(false);
    const res = await authFetch('https://aitutor-ki77ua6x2a-uc.a.run.app/', { method: 'POST', body: '{}' });
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe('unavailable-under-emulator');
    expect(global.fetch).not.toHaveBeenCalled();
    // One notice per host, not one per call.
    await authFetch('https://aitutor-ki77ua6x2a-uc.a.run.app/', { method: 'POST', body: '{}' });
    expect(info).toHaveBeenCalledTimes(1);
    info.mockRestore();
  });

  test('a local functions emulator URL still goes through the authenticated path', async () => {
    const { authFetch, functionsReachable } = load(true);
    expect(functionsReachable('http://localhost:5001/performsat/us-central1/aiTutor')).toBe(true);
    expect(functionsReachable('http://127.0.0.1:5001/x')).toBe(true);
    // No signed-in user in this test, so the normal path throws — proving it was taken.
    await expect(authFetch('http://localhost:5001/x')).rejects.toThrow('Not authenticated');
  });

  test('outside emulator mode deployed URLs are reachable', () => {
    const { functionsReachable } = load(false);
    expect(functionsReachable('https://aitutor-ki77ua6x2a-uc.a.run.app/')).toBe(true);
  });
});
