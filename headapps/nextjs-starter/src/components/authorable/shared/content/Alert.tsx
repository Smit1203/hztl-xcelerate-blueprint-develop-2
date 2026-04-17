import React, { useState, useEffect, useMemo, startTransition, JSX } from 'react';
import { tv } from 'tailwind-variants';
import Cookies from 'js-cookie';

import { Content } from '.generated/Content/Alert.model';
import { SvgIcon } from 'helpers/SvgIcon';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { SiteAlert } from 'lib/page-props-factory/plugins/site-settings';
import { getTestProps } from 'lib/testing/utils';
import { useSiteSettings } from 'lib/hooks/sitecore/context';
// Types
export type AlertProps = Content.Alert.Alert_Component;
export type AlertParametersProps = Content.Alert.AlertParameters_Component;

// Defines the possible types of alerts that can be displayed
type AlertType = 'priority' | 'neutral';
const DEFAULT_ALERT_TYPE: AlertType = 'neutral';
const COOKIE_PREFIX = 'alert-dismissed-';

// Manages the state of alerts including dismissal and hydration
interface AlertState {
  dismissing: string | null;
  hydrated: boolean;
  dismissedAlerts: Set<string>;
}

// Parses a date string (including UTC with 'Z') into a JavaScript Date object in local time
const parseLocal = (dateString?: string): Date | null => {
  if (!dateString) return null;
  // Handle Sitecore's default empty date
  if (dateString === '0001-01-01T00:00:00Z') return null;
  return new Date(dateString);
};

// Checks if an alert is currently active based on its start and end dates
const isAlertActive = (alert: SiteAlert): boolean => {
  const { startDate, endDate } = alert || {};
  const now = new Date();
  const start = parseLocal(startDate?.jsonValue?.value);
  const end = parseLocal(endDate?.jsonValue?.value);
  if (!start && !end) return true;
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
};

// Custom hook to manage alert state and logic
const useAlerts = (alertTypeGuid: string | undefined) => {
  const siteSettings = useSiteSettings();

  const siteAlerts = useMemo(() => siteSettings?.siteAlerts ?? [], [siteSettings?.siteAlerts]);

  const [state, setState] = useState<AlertState>({
    dismissing: null,
    hydrated: false,
    dismissedAlerts: new Set(),
  });

  useEffect(() => {
    const dismissedFromCookies = new Set<string>();
    siteAlerts.forEach((alert) => {
      if (alert?.id && Cookies.get(COOKIE_PREFIX + alert.id)) {
        dismissedFromCookies.add(alert.id);
      }
    });
    startTransition(() => {
      setState((prev) => ({ ...prev, dismissedAlerts: dismissedFromCookies, hydrated: true }));
    });
  }, [siteAlerts]);

  const matchedAlerts = useMemo(
    () =>
      siteAlerts.filter((alert) => {
        const alertTypeGuidFromAlert = alert?.alertType?.jsonValue?.id;

        const expectedGuid = alertTypeGuid?.toLowerCase();
        const matchesType = !expectedGuid || alertTypeGuidFromAlert?.toLowerCase() === expectedGuid;

        const isActive = isAlertActive(alert);
        const isDismissed = alert.id && state.dismissedAlerts.has(alert.id);

        return matchesType && isActive && !isDismissed;
      }),
    [siteAlerts, alertTypeGuid, state.dismissedAlerts]
  );

  const dismissAlert = (alertId: string) => {
    setState((prev) => ({ ...prev, dismissing: alertId }));
  };

  const handleDismissed = (alertId: string) => {
    Cookies.set(COOKIE_PREFIX + alertId, '1');
    startTransition(() => {
      setState((prev) => {
        const next = new Set(prev.dismissedAlerts);
        next.add(alertId);
        return { ...prev, dismissedAlerts: next, dismissing: null };
      });
    });
  };

  return {
    matchedAlerts,
    state,
    dismissAlert,
    handleDismissed,
  };
};

const Alert = (props: AlertProps): JSX.Element | null => {
  const alertTypeGuid = props?.params?.['Alert Type']?.replace(/[{}]/g, '');

  const { matchedAlerts, state, dismissAlert, handleDismissed } = useAlerts(alertTypeGuid);

  if (!matchedAlerts.length) return null;

  const { container, alertStyle, content, text, cta, dismissButton, ctaWrapper, arrowIcon } =
    TAILWIND_VARIANTS();

  return (
    <div className={`${container()} ${state.hydrated ? 'block' : 'hidden'}`}>
      {matchedAlerts.map((alert) => {
        const alertTypeValue =
          alert.alertType?.jsonValue?.fields?.title?.value?.toLowerCase() || DEFAULT_ALERT_TYPE;
        const isExternal = alert.alertCTA?.jsonValue?.value?.target === '_blank';
        const isFading = state.dismissing === alert.id;

        return (
          <div
            key={alert.id}
            className={`${alertStyle({ type: alertTypeValue as AlertType })} ${isFading ? 'opacity-0' : 'opacity-100'}`}
            role={alertTypeValue === 'priority' ? 'alert' : 'region'}
            {...getTestProps(`component-alert-${alert.id}`)}
            onTransitionEnd={() => {
              if (isFading && alert.id) {
                handleDismissed(alert.id);
              }
            }}
          >
            <div className={content()}>
              <SvgIcon
                size="s"
                icon={alertTypeValue === 'priority' ? 'alert-priority' : 'alert-neutral'}
              />
              <div className={text()}>
                <PlainTextWrapper
                  field={{ value: alert.alertText?.value }}
                  {...getTestProps(`text`)}
                />
              </div>
              {alert.alertCTA?.jsonValue && (
                <div className={ctaWrapper()}>
                  <LinkWrapper
                    className={cta()}
                    field={alert.alertCTA.jsonValue}
                    ctaComponentClass="default"
                    {...getTestProps(`alert-cta`)}
                  />
                  {!isExternal && (
                    <SvgIcon
                      className={arrowIcon()}
                      fill="currentColor"
                      icon="arrow-dash-right"
                      size="s"
                      viewBox="0 0 21 21"
                    />
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => alert.id && dismissAlert(alert.id)}
              className={dismissButton()}
              aria-label="Dismiss alert"
              {...getTestProps(`alert-dismiss`)}
            >
              <SvgIcon size="xs" icon="close" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const Default = Alert;

const TAILWIND_VARIANTS = tv({
  slots: {
    container: ['alerts-container', 'w-full', 'transition-all', 'duration-500'],
    alertStyle: [
      'flex',
      'items-center',
      'justify-between',
      'pr-6',
      'border-b',
      'border-component-alert-border',
      'transition-all',
      'duration-200',
      'text-component-button-white-link-text',
      'transition-opacity',
      'duration-300',
      'ease-in',
    ],
    content: [
      'flex-col',
      'flex',
      'items-start',
      'gap-4',
      'py-spacing-spacing-16',
      'px-layout-base-margin-x',
      'md:flex-row',
      'md:flex-grow',
      'md:justify-center',
    ],
    text: ['md:self-center'],
    ctaWrapper: ['group', 'flex', 'items-center', 'gap-2', 'md:self-end'],
    cta: [
      'text-typography-body-medium-font-size',
      'relative',
      'font-semibold',
      'group',
      'text-component-button-white-link-text',
      'hover:text-component-button-white-link-text-hover',
      'focus:text-component-button-white-link-text-hover',
      'after:absolute',
      'after:inset-x-0',
      'after:bottom-0',
      'after:h-0.5',
      'after:bg-white',
      'after:transform',
      'after:origin-left',
      'after:scale-x-0',
      'after:transition-transform',
      'after:duration-300',
      'after:ease-out',
      'group-hover:after:scale-x-100',
    ],
    dismissButton: [
      'text-sm',
      'opacity-75',
      'hover:opacity-100',
      'transition-opacity',
      'duration-200',
      'self-start',
      'pt-6',
      'md:self-center',
      'md:pt-0',
    ],
    arrowIcon: [
      'h-auto',
      'w-xs',
      'opacity-0',
      'transition-all',
      'duration-200',
      'group-hover:opacity-100',
      'group-hover:translate-x-1',
    ],
  },
  variants: {
    type: {
      priority: {
        alertStyle: ['bg-component-alert-bg-priority'],
      },
      neutral: {
        alertStyle: ['bg-component-alert-bg-neutral'],
      },
    },
  },
});
