export default function Home() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.8em', color: '#2c3e50' }}>BlockedOrDown.com</h1>
      <p style={{ fontSize: '1.3em', color: '#555', margin: '20px 0' }}>
        Check if a website is down globally or blocked on your network (work/school/firewall).
      </p>
      <div style={{ margin: '40px 0' }}>
        <input 
          type="text" 
          placeholder="Enter website (e.g., netflix.com)" 
          style={{ padding: '15px', width: '70%', maxWidth: '500px', fontSize: '1.1em', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button style={{ padding: '15px 30px', fontSize: '1.1em', marginLeft: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Check Now
        </button>
      </div>
      <p style={{ color: '#777' }}>Or quick test popular sites below:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '40px 0' }}>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>YouTube</button>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#000000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>TikTok</button>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#e50914', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Netflix</button>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#f09433', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Instagram</button>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>WhatsApp</button>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#5865f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Discord</button>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#ff4500', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Reddit</button>
        <button style={{ padding: '20px', fontSize: '1.2em', background: '#00ff99', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>ChatGPT</button>
      </div>
      <p style={{ color: '#888', fontSize: '0.9em', marginTop: '40px' }}>
        Results are indicative only — advanced filtering may not be detected.
      </p>
    </div>
  );
}