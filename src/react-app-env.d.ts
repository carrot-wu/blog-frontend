/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test1.ts';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

interface Window {
  Prism: any;
}

declare module '@carrotwu/valine' {
  export interface ValineOptions {
    el: string;
    appId: string;
    appKey: string;
    placeholder?: string;
    path?: string | number;
    avatar?: '' | 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'hide';
    meta?: ('nick' | 'mail' | 'link')[];
    pageSize?: number;
    lang?: string;
    visitor?: boolean;
    highlight?: boolean;
    avatarForce?: boolean;
    recordIP?: boolean;
    serverURLs?: string;
    emojiCDN?: string;
    emojiMaps?: object;
    enableQQ?: boolean;
    requiredFields?: ('nick' | 'mail' | 'link')[];
    adminName?: string;
    adminEmail?: string;
    adminImg?: string;
  }
  class Valine {
    el: any;
    constructor(options?: ValineOptions) {}
    init(options: ValineOptions);
  }
  export = Valine;
}
