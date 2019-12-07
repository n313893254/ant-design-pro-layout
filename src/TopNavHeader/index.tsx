import './index.less';

import React, { Component } from 'react';
import classNames from 'classnames';

import {
  SiderMenuProps,
  defaultRenderLogoAndTitle,
} from '../SiderMenu/SiderMenu';

import { HeaderViewProps } from '../Header';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  rightContentRender?: HeaderViewProps['rightContentRender'];
}

export default class TopNavHeader extends Component<TopNavHeaderProps> {
  maim: HTMLDivElement | null = null;

  render(): React.ReactNode {
    const {
      theme,
      menuData,
      onMenuHeaderClick,
      contentWidth,
      rightContentRender,
      logo,
      title,
      menuHeaderRender,
      className: propsClassName,
      style,
    } = this.props;

    const baseClassName = 'ant-pro-top-nav-header';
    const headerDom = defaultRenderLogoAndTitle(logo, title, menuHeaderRender);

    const className = classNames(baseClassName, propsClassName, {
      light: theme === 'light',
    });

    return (
      <div className={className} style={style}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${baseClassName}-main ${
            contentWidth === 'Fixed' ? 'wide' : ''
          }`}
        >
          {headerDom && (
            <div
              className={`${baseClassName}-left`}
              onClick={onMenuHeaderClick}
            >
              <div className={`${baseClassName}-logo`} key="logo" id="logo">
                {headerDom}
              </div>
            </div>
          )}
          <div style={{ flex: 1 }} className={`${baseClassName}-menu`}>
            {menuData}
          </div>
          {rightContentRender &&
            rightContentRender({
              ...this.props,
            })}
        </div>
      </div>
    );
  }
}
