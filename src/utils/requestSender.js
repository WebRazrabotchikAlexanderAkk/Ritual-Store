export async function sendRequest(payload) {
  await new Promise((resolve) => window.setTimeout(resolve, 500));
  return {
    ok: true,
    channels: ['Email', 'Telegram', 'MAX'],
    payload,
  };
}
