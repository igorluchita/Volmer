'use client';

import type {ReactNode} from 'react';
import {trackMessengerClick, type Messenger} from '@/lib/google-consent';

type Props = {
  messenger: Messenger;
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

/** Client boundary for messenger links rendered inside Server Components. */
export function TrackedMessengerLink({messenger, href, children, ...linkProps}: Props) {
  return <a {...linkProps} href={href} onClick={() => trackMessengerClick(messenger)}>{children}</a>;
}
