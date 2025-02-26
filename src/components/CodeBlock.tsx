import React, {useEffect} from "react";
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prism-themes/themes/prism-one-dark.css';


interface CodeBlockProps {
    code: string;
    language?: string;
}


const CodeBlock: React.FC<CodeBlockProps> = ({code, language = 'tsx'}) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, [code]);

    return (
        <div className="rounded-md shadow-lg
         overflow-y-auto mb-8 max-h-[475px] ">
            <pre className="">
                <code className={`language-${language}`}>
                {code}
                </code>
            </pre>
        </div>
    )
}


export default CodeBlock