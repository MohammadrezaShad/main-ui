interface HtmlToReactProps extends React.HTMLAttributes<HTMLDivElement> {
  html: string;
}

export default function HtmlToReact({className, html, ...otherProps}: HtmlToReactProps) {
  return <div {...otherProps} dangerouslySetInnerHTML={{__html: html}} className={className} />;
}
