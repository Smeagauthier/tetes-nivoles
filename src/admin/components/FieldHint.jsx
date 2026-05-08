export default function FieldHint({ children }) {
    return (
        <div style={{
            marginTop: -15,
            marginBottom: 25,
            fontSize: 12,
            color: 'rgba(184, 134, 11, 0.6)',
            letterSpacing: '0.02em'
        }}>
            {children}
        </div>
    );
}