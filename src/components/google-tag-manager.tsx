import {createGoogleTagManagerBootstrap, GTM_CONTAINER_ID} from '@/lib/google-consent';

export function GoogleTagManagerHead() {
  const bootstrap = createGoogleTagManagerBootstrap();
  return <script
    id="volmer-gtm-consent-bootstrap"
    dangerouslySetInnerHTML={{__html: bootstrap.replace(/</g, '\\u003c')}}
  />;
}

export function GoogleTagManagerBody() {
  return <noscript><iframe
    src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
    height="0"
    width="0"
    style={{display: 'none', visibility: 'hidden'}}
    title="Google Tag Manager"
  /></noscript>;
}
