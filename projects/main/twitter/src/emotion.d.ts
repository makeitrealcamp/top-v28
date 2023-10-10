import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      black: string;
      white: string;
    } & Record<string, string>;
    fonts: string[];
    space: string[];
    border: {
      radius: Record<string, string>;
      width: string[];
    };
  }
}
