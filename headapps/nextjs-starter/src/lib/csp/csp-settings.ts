import scConfig from 'sitecore.config';
import { Field } from '@sitecore-content-sdk/nextjs';
import graphqlClientFactory from 'lib/graphql-client-factory';

/**
 * For Next JS 15.x
 * In Next JS 15.x type scripts can be  imported into a JS file.
 * cors-header.js can use TS version of CPS setting retrival using Graph QL
 */

// Content Security Policy Settings object
export interface CSPSettings {
  scriptSource?: string;
  scriptElement?: string;
  styleSource?: string;
  imageSource?: string;
  connectSource?: string;
  frameSource?: string;
  mediaSource?: string;
  fontSource?: string;
}

// Get CSP Directives and retrive domain settings from Sitecore
export const getCSPDirectives = async (): Promise<string> => {
  const isDev = process.env.NODE_ENV === 'development';
  const cspSettings = await getCSPSettings();

  if (cspSettings) {
    // Define CSP directives following Sitecore Headless best practices
    const cspDirectives = [
      // Default fallback
      "default-src 'self'",

      // Scripts - Allow specific external sources and eval for necessary functionality
      `script-src 'self'  ${isDev ? "'unsafe-eval'" : ''} ${cspSettings?.scriptSource}`,

      // Script elements specifically
      `script-src-elem 'self' 'unsafe-inline' ${cspSettings?.scriptElement}`,

      // Styles
      `style-src 'self' 'unsafe-inline' ${cspSettings?.styleSource}`,

      // Images - ensure data URLs are explicitly allowed
      `img-src 'self' data: https: ${cspSettings?.imageSource}`,

      // Fonts
      `font-src 'self' data: ${cspSettings?.fontSource}`,

      // Connect (APIs, WebSocket)
      `connect-src 'self' ${scConfig.api.local.apiHost} ${cspSettings?.connectSource}`,

      // Frames
      `frame-src 'self' ${scConfig.api.local.apiHost.replace(/\/$/, '')} ${cspSettings?.frameSource}`,

      // Media
      `media-src 'self' https: data: ${cspSettings?.mediaSource}`,

      // Object sources - allow data URLs for plugins
      "object-src 'self'",

      // Base URI restriction
      "base-uri 'self'",

      // Form submissions
      "form-action 'self'",

      // Worker scripts
      "worker-src 'self' blob:",

      // Manifest
      "manifest-src 'self'",
    ].join('; ');

    return cspDirectives;
  } else {
    return '';
  }
};

// Retrive Content Security Policy Settings
export const getCSPSettings = async (): Promise<CSPSettings> => {
  const graphqlClient = graphqlClientFactory();
  try {
    const cspSettingsResult = await graphqlClient.request<GetCSPSettingsType>(CspSettingsQuery);

    const cpsSettings: CSPSettings = {
      scriptSource: cspSettingsResult.item?.scriptSource?.jsonValue?.value,
      scriptElement: cspSettingsResult.item?.scriptElement?.jsonValue?.value,
      styleSource: cspSettingsResult.item?.styleSource?.jsonValue?.value,
      imageSource: cspSettingsResult.item?.imageSource?.jsonValue?.value,
      connectSource: cspSettingsResult.item?.connectSource?.jsonValue?.value,
      frameSource: cspSettingsResult.item?.frameSource?.jsonValue?.value,
      mediaSource: cspSettingsResult.item?.mediaSource?.jsonValue?.value,
      fontSource: cspSettingsResult.item?.fontSource?.jsonValue?.value,
    };

    return cpsSettings;
  } catch (error) {
    console.error(error);
    return {} as CSPSettings;
  }
};

type GetCSPSettingsType = {
  item?: {
    scriptSource: {
      jsonValue: Field<string>;
    };
    scriptElement: {
      jsonValue: Field<string>;
    };
    styleSource: {
      jsonValue: Field<string>;
    };
    imageSource: {
      jsonValue: Field<string>;
    };
    connectSource: {
      jsonValue: Field<string>;
    };
    frameSource: {
      jsonValue: Field<string>;
    };
    mediaSource: {
      jsonValue: Field<string>;
    };
    fontSource: {
      jsonValue: Field<string>;
    };
  };
};

const CspSettingsQuery = `
  query CSPSettings {
    # path can be an item tree path or GUID-based id
    item(path: "B198FC4C-EA1B-4ABD-974C-B6B8D9046E51", language: "en") {
      ... on ContentSecurityPolicySettings {
        scriptSource {
          jsonValue
        }
        scriptElement {
          jsonValue
        }
        styleSource {
          jsonValue
        }
        imageSource {
          jsonValue
        }
        connectSource {
          jsonValue
        }
        frameSource {
          jsonValue
        }
        mediaSource {
          jsonValue
        }
        fontSource {
          jsonValue
        }
      }
    }
  }
`;
