export default function RichText({ segments, className, style }) {
    return (
        <span className={className} style={style}>
            {segments.map((seg, i) =>
                seg.mark
                    ? <mark key={i}>{seg.text}</mark>
                    : <span key={i}>{seg.text}</span>
            )}
        </span>
    );
}