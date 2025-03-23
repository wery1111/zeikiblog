export default function CmsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="outstatic-container">
      {children}
    </div>
  )
}
