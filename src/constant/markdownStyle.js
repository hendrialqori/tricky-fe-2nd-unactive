import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from './markdownConfig'

export const Component = {
    code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
        <SyntaxHighlighter 
            style={atomDark} 
            language={match[1]}
            {...props}>{String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        ) : (
        <code className={className} {...props} />
        )
     }
    }