/* eslint-disable no-undef */
import {useLocation}                                 from '@docusaurus/router';
import {useDocsSidebar}                              from '@docusaurus/theme-common/internal';
import BackToTopButton                               from '@theme/BackToTopButton';
import DocPageLayoutMain                             from '@theme/DocPage/Layout/Main';
import DocPageLayoutSidebar                          from '@theme/DocPage/Layout/Sidebar';
import Layout                                        from '@theme/Layout';
import React, {useEffect, useLayoutEffect, useState} from 'react';

import styles                                        from './styles.module.css';

const FocusModal = ({content, onExit}) => {
  const [container, setContainer] = useState(null);

  useLayoutEffect(() => {
    container?.appendChild(content);
  }, [container]);

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === `Escape`) {
        onExit();
      }
    };

    document.addEventListener(`keydown`, keyDownHandler);
    return () => {
      document.removeEventListener(`keydown`, keyDownHandler);
    };
  }, []);

  return (
    <div className={styles.modalParent}>
      <div className={styles.modalOverlay} onClick={() => onExit()}/>
      <div className={styles.modalContent} ref={setContainer}/>
    </div>
  );
};

const useFocusModal = () => {
  const location = useLocation();
  const [modal, setModal] = useState(null);

  useLayoutEffect(() => {
    if (!location.hash)
      return;

    const navigation = window.performance.getEntriesByType(`navigation`);
    if (navigation.length > 0 && navigation[0].type !== `navigate`)
      1;//return;

    const target = document.querySelector(location.hash);
    if (!target)
      return;

    const copy = document.createElement(`div`);

    let current = target;
    do {
      copy.append(current.cloneNode(true));
      current = current.nextSibling;
    } while (current && current.tagName !== target.tagName);

    setModal(<FocusModal content={copy} onExit={() => setModal(null)}/>);
  }, []);

  return modal;
};

// eslint-disable-next-line arca/no-default-export
export default function DocPageLayout({title, children}) {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);

  const modal = useFocusModal();

  return (
    <Layout title={title} wrapperClassName={styles.docsWrapper}>
      <BackToTopButton />
      {modal}
      <div className={styles.docPage}>
        {sidebar && (
          <DocPageLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocPageLayoutMain>
      </div>
    </Layout>
  );
}
