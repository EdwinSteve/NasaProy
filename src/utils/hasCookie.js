export default function hasAuthCookie() {
  return document.cookie.split(';').some(c => c.trim().startsWith('_id_user='));
}