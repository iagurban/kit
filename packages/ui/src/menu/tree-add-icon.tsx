import { observer } from 'mobx-react-lite';

export const TreeAddIcon = observer<{
  sub: boolean;
}>(function TreeAddIcon({ sub }) {
  const xShift = sub ? -2 : -18;
  return (
    <svg viewBox="0 0 100 100">
      <path d="M 10 20 L 90 20 L 90 30 L 10 30" fill="currentColor" />

      <path
        d={`M ${48 + xShift} 60 L ${90 + xShift} 60 L ${90 + xShift} 71 L ${48 + xShift} 71`}
        fill="currentColor"
      />
      <path
        d={`M ${64 + xShift} 45 L ${75 + xShift} 45 L ${75 + xShift} 85 L ${64 + xShift} 85`}
        fill="currentColor"
      />
      {sub && (
        <path
          d="M 20 40 L 20 65 L 36 65"
          stroke="currentColor"
          strokeWidth={6}
          fill="none"
          strokeDasharray="3 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
});
