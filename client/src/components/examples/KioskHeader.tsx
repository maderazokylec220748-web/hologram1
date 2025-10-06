import KioskHeader from '../KioskHeader';

export default function KioskHeaderExample() {
  return (
    <div className="min-h-screen bg-background">
      <KioskHeader onReset={() => console.log('Reset clicked')} />
    </div>
  );
}
