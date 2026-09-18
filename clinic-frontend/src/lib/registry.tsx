"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({children}:{
  children: React.ReactNode
}) {
  // 스타일시트를 한번만 생성하도록 lazy-initial state 사용
  const [styledComponentsStyleSheet] = useState(() => 
    new ServerStyleSheet()
  );
  
  /* 서버사이드 렌더링(SSR)
  웹페이지의 화면을 서버에서 미리 그려서 보냄
  서버 사이드 렌더링 시점에 스타일을 추출하여 HTML에 주입 */
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // 메모리 누수를 막기 위해 스타일 초기화
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 클라이언트 사이드에서는 그대로 렌더링
  if (typeof window !== "undefined")
    return <>{children}</>;

  // 서버 사이드에서는 StyleSheetManager로 감싸서 스타일 수집
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};
