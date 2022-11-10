import Head from "next/head";
import styled, { ThemeProvider } from 'styled-components';
import { useEffect, useState } from "react";

import Search from "../components/search";
import { Card } from "../components/card";
import { theme } from "../styles/theme";

/**
 * Maybe this should be our style guide documentation
 * Storybook is another option
 */

const { colors } = theme;
export default function StyleGuide() {

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Prayer Times - Style Guide</title>
            </Head>

            <main className={`grid grid-cols-1 w-5/6 mx-auto bg-${colors['U400']} p-2 gap-4`}>
                <h2 className="text-theme-8">Style Guide Documentation - draft</h2>
                <div className="grid gap-2  grid-cols-9 grid-rows-2 col-start-1 text-center">
                    {Object.keys(colors).map(key =>
                        <div key={key} className={`h-[10vh]`} style={{ "background": colors[key], color:"magenta", textShadow:"4px 6vh black" }}>{key}</div>
                    )}
                </div>

            </main>

        </ThemeProvider>
    );
}
