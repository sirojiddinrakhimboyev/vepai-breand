import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'vepai-branding-site-veiuebrl',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_HV05KQOSuPdYYoI_jVa0Re8vzWbZclP4',
  authRequired: false,
  auth: { mode: 'managed' },
})
