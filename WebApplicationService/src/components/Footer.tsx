export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="container py-6 text-sm text-slate-600">
        <p>&copy; {new Date().getFullYear()} Cycle Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
