"use client";

import StyledComponentsRegistry from "@/lib/registry";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};
