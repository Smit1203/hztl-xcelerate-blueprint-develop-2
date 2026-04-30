"use client";
import React from "react";
import {
  ComponentPropsCollection,
  ComponentPropsContext,
  Page,
  SitecoreProvider,
} from "@sitecore-content-sdk/nextjs";
import scConfig from "sitecore.config";
import components from ".sitecore/component-map.client";
import {
  BrandAndThemeProvider,
  getBrandForSiteName,
} from "lib/context/BrandAndThemeContext";
import Scripts from "src/Scripts";

export default function Providers({
  children,
  page,
  componentProps = {},
}: {
  children: React.ReactNode;
  page: Page;
  componentProps?: ComponentPropsCollection;
}) {
  const brand = page.siteName ? getBrandForSiteName(page.siteName) : undefined;

  return (
    <SitecoreProvider
      api={scConfig.api}
      componentMap={components}
      page={page}
      loadImportMap={() => import(".sitecore/import-map.client")}
    >
      <ComponentPropsContext value={componentProps}>
        <BrandAndThemeProvider brand={brand} applyToBody>
          <Scripts />
          {children}
        </BrandAndThemeProvider>
      </ComponentPropsContext>
    </SitecoreProvider>
  );
}
