export function MapSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Located in the heart of Islamabad's business district, our office is easily accessible and equipped with
            modern facilities for client meetings and project discussions.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl border">
          <div className="aspect-video bg-muted/30 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl text-muted-foreground/30">🗺️</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">123 Engineering Plaza, Sector F-8, Islamabad, Pakistan</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Google Maps integration would be embedded here in production
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Free parking available • Metro station nearby • Wheelchair accessible
          </p>
        </div>
      </div>
    </section>
  )
}
