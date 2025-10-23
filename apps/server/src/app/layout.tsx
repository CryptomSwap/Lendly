export const metadata = {
  title: 'Lendly Israel - Equipment Rental API',
  description: 'Hebrew equipment rental platform API server',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              direction: rtl;
              text-align: right;
              line-height: 1.6;
              color: #333;
              min-height: 100vh;
            }
            
            .container {
              max-width: 1200px;
              margin: 2rem auto;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.95);
              min-height: calc(100vh - 4rem);
              box-shadow: 0 0 30px rgba(0,0,0,0.2);
              backdrop-filter: blur(10px);
              border-radius: 20px;
            }
            
            h1 {
              background: linear-gradient(135deg, #0ea5e9, #3b82f6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              border-bottom: 3px solid #0ea5e9;
              padding-bottom: 1rem;
              margin-bottom: 2rem;
              font-size: 2.5rem;
              font-weight: bold;
              text-align: center;
            }
            
            h2 {
              color: #334155;
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-size: 1.5rem;
              font-weight: 600;
            }
            
            ul {
              list-style: none;
              padding: 0;
              margin: 1rem 0;
            }
            
            li {
              margin: 0.5rem 0;
              padding: 1rem;
              background: #f8fafc;
              border-radius: 8px;
              border-right: 4px solid #0ea5e9;
              transition: all 0.3s ease;
            }
            
            li:hover {
              background: #e2e8f0;
              transform: translateX(-5px);
            }
            
            a {
              color: #0ea5e9;
              text-decoration: none;
              font-weight: bold;
              transition: color 0.3s ease;
            }
            
            a:hover {
              color: #0284c7;
              text-decoration: underline;
            }
            
            .status {
              background: linear-gradient(135deg, #dcfce7, #bbf7d0);
              color: #166534;
              padding: 1.5rem;
              border-radius: 12px;
              border-right: 4px solid #22c55e;
              margin: 1.5rem 0;
              font-size: 1.1rem;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .status strong {
              font-weight: 700;
            }
            
            .hebrew {
              font-family: 'Segoe UI', 'Arial Hebrew', 'David', sans-serif;
              font-size: 1.1rem;
            }
            
            .equipment-item {
              background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
              border-right: 4px solid #0ea5e9;
              padding: 1rem;
              margin: 0.5rem 0;
              border-radius: 8px;
              transition: all 0.3s ease;
            }
            
            .equipment-item:hover {
              background: linear-gradient(135deg, #e0f2fe, #bae6fd);
              transform: translateX(-3px);
            }
            
            .price {
              color: #059669;
              font-weight: bold;
              font-size: 1.2rem;
            }
            
            .feature-list li {
              background: linear-gradient(135deg, #fef3c7, #fde68a);
              border-right: 4px solid #f59e0b;
              color: #92400e;
            }
            
            .feature-list li:hover {
              background: linear-gradient(135deg, #fde68a, #fcd34d);
            }
            
            .api-endpoint li {
              background: linear-gradient(135deg, #ede9fe, #ddd6fe);
              border-right: 4px solid #8b5cf6;
              color: #5b21b6;
            }
            
            .api-endpoint li:hover {
              background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
            }
            
            /* Search Section */
            .search-section {
              background: rgba(255, 255, 255, 0.9);
              padding: 2rem;
              border-radius: 15px;
              margin: 2rem 0;
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            }
            
            .search-form {
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              align-items: center;
            }
            
            .search-input, .search-select {
              flex: 1;
              min-width: 200px;
              padding: 1rem;
              border: 2px solid #e2e8f0;
              border-radius: 10px;
              font-size: 1rem;
              background: white;
              transition: all 0.3s ease;
            }
            
            .search-input:focus, .search-select:focus {
              outline: none;
              border-color: #0ea5e9;
              box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
            }
            
            .search-button {
              padding: 1rem 2rem;
              background: linear-gradient(135deg, #0ea5e9, #3b82f6);
              color: white;
              border: none;
              border-radius: 10px;
              font-size: 1rem;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            
            .search-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
            }
            
            /* Equipment Grid */
            .equipment-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
              gap: 2rem;
              margin: 2rem 0;
            }
            
            .equipment-card {
              background: white;
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
              transition: all 0.3s ease;
            }
            
            .equipment-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            }
            
            .equipment-image {
              height: 200px;
              background: #f8fafc;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }
            
            .equipment-image img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            .no-image {
              color: #64748b;
              font-size: 1.2rem;
            }
            
            .equipment-info {
              padding: 1.5rem;
            }
            
            .equipment-title {
              font-size: 1.3rem;
              font-weight: bold;
              color: #1e293b;
              margin-bottom: 0.5rem;
            }
            
            .equipment-description {
              color: #64748b;
              line-height: 1.6;
              margin-bottom: 1rem;
            }
            
            .equipment-details {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              margin-bottom: 1.5rem;
            }
            
            .equipment-price {
              font-size: 1.5rem;
              font-weight: bold;
              color: #059669;
            }
            
            .equipment-location, .equipment-owner {
              color: #64748b;
              font-size: 0.9rem;
            }
            
            .book-button {
              width: 100%;
              padding: 1rem;
              background: linear-gradient(135deg, #059669, #10b981);
              color: white;
              border: none;
              border-radius: 10px;
              font-size: 1rem;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            
            .book-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
            }
            
            /* Features Grid */
            .features-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 2rem;
              margin: 2rem 0;
            }
            
            .feature-card {
              background: white;
              padding: 2rem;
              border-radius: 15px;
              text-align: center;
              box-shadow: 0 8px 25px rgba(0,0,0,0.1);
              transition: all 0.3s ease;
            }
            
            .feature-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            }
            
            .feature-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            
            .feature-card h3 {
              font-size: 1.2rem;
              color: #1e293b;
              margin-bottom: 0.5rem;
            }
            
            .feature-card p {
              color: #64748b;
              line-height: 1.6;
            }
            
            /* Loading and No Results */
            .loading, .no-results {
              text-align: center;
              padding: 3rem;
              font-size: 1.2rem;
              color: #64748b;
            }
            
            @media (max-width: 768px) {
              .container {
                padding: 1rem;
                margin: 1rem;
              }
              
              h1 {
                font-size: 2rem;
              }
              
              h2 {
                font-size: 1.3rem;
              }
              
              .search-form {
                flex-direction: column;
              }
              
              .search-input, .search-select, .search-button {
                width: 100%;
              }
              
              .equipment-grid {
                grid-template-columns: 1fr;
              }
              
              .features-grid {
                grid-template-columns: 1fr;
              }
            }
          `
        }} />
      </head>
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}