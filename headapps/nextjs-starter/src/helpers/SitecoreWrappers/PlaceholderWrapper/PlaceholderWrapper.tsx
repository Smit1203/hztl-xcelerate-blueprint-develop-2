import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import { SvgIcon } from 'helpers/SvgIcon';
import useIsEditing from 'lib/hooks/useIsEditing';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import React, { useCallback } from 'react';

type PlaceholderProps = Parameters<typeof Placeholder>[0];

export interface PlaceholderWrapperProps extends PlaceholderProps {
  helpTextClassName?: string;
  helpTextHideIf?: boolean;
  helpTextContent?: React.ReactNode;
  /**
   * Recommended to use `render` instead and include the wrapping element
   * That way the editing help text can be rendered outside of the wrapping element instead of inside.
   * Most relevant for when using flex or grid displays
   */
  renderEach?: PlaceholderProps['renderEach'];
}

export function PlaceholderWrapper({
  helpTextClassName,
  helpTextHideIf,
  helpTextContent,
  render,
  renderEach,
  renderEmpty,
  name,
  ...props
}: PlaceholderWrapperProps) {
  const isEditing = useIsEditing();

  // Fix what seems to be a JSS bug.  If JSS fixes this in a later version, this can be removed
  const fixedRender = useCallback<NonNullable<PlaceholderProps['render']>>(
    (components, data, props) => {
      if (!render) {
        return null;
      }
      if (isEditing) {
        // When in editing mode, there is an extra layer that we need to get to the children of
        // to get the correct notes.  This seems to be a bug.
        const wrapperComponent = components[0] as React.ReactElement<{
          children: React.ReactNode[];
        }>;
        const componentsToRender = wrapperComponent?.props?.children;
        const renderedChildren = render(componentsToRender, data, props) as React.ReactElement;

        wrapperComponent.props.children.splice(0, componentsToRender.length, renderedChildren);
        return wrapperComponent;
      }

      return render(components, data, props);
    },
    [isEditing, render]
  );

  // Fix what seems to be a JSS bug.  If JSS fixes this in a later version, this can be removed
  const fixedRenderEach = useCallback<NonNullable<PlaceholderProps['renderEach']>>(
    (component, index) => {
      if (!renderEach) {
        return null;
      }
      if (isEditing) {
        // When in editing mode, there is an extra layer that we need to get to the children of
        // to get the correct notes.  This seems to be a bug.
        const wrapperComponent = component as React.ReactElement<{ children: React.ReactNode[] }>;
        const componentsToRender = wrapperComponent?.props?.children as React.ReactElement[];
        const renderedChildren = componentsToRender.map(
          (x, i) => renderEach(x, i) as React.ReactElement
        );

        wrapperComponent.props.children.splice(0, componentsToRender.length, [...renderedChildren]);
        return wrapperComponent;
      }

      return renderEach(component, index);
    },
    [isEditing, renderEach]
  );

  // If not edting, render it as-is.
  if (!isEditing) {
    return (
      <Placeholder
        {...props}
        name={name}
        render={render}
        renderEach={renderEach}
        // By default, if a render method is defined, JSS will use that even for empty renderings
        // Usually this isn't desired, so instead use the default implementation if one isn't specified
        renderEmpty={renderEmpty ?? ((components) => components)}
      />
    );
  }

  // Customize based on client needs
  return (
    <div>
      <PlaceholderIndicator
        {...{ helpTextClassName, helpTextContent, helpTextHideIf, name }}
        direction="down"
      />
      <Placeholder
        {...props}
        name={name}
        render={render ? fixedRender : undefined}
        renderEach={renderEach ? fixedRenderEach : undefined}
        // By default, if a render method is defined, JSS will use that even for empty renderings
        // Usually this isn't desired, so instead use the default implementation if one isn't specified
        renderEmpty={renderEmpty ?? ((components) => components)}
      />
      <PlaceholderIndicator
        {...{ helpTextClassName, helpTextContent, helpTextHideIf, name }}
        direction="up"
      />
    </div>
  );
}

interface PlaceholderIndicatorrProps {
  helpTextClassName?: string;
  helpTextHideIf?: boolean;
  helpTextContent?: React.ReactNode;
  direction: 'up' | 'down';
  name: string;
}
function PlaceholderIndicator({
  helpTextClassName,
  helpTextHideIf,
  helpTextContent,
  direction,
  name,
}: PlaceholderIndicatorrProps) {
  const icon = direction === 'up' ? 'chevron-up' : 'chevron-down';

  return (
    <EditingHelpText className={helpTextClassName} hideIf={helpTextHideIf}>
      <div className="flex justify-center">
        <SvgIcon className="mx-2 my-1" icon={icon} size="xxs" />
        {helpTextContent ?? `Placeholder: ${name}`}
        <SvgIcon className="mx-2 my-1" icon={icon} size="xxs" />
      </div>
    </EditingHelpText>
  );
}
