import React, {useEffect} from "react";
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prism-themes/themes/prism-one-dark.css';



interface CodeBlockProps {
    code: string;
    language?: string;
}


const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx' }) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, [code]);

    return(
        <>
        <pre>
            <code className={`language-${language}`}>
                {code}
            </code>
        </pre>
        </>
    )
}


export default CodeBlock