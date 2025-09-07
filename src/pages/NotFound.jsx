import React, { useState, useEffect } from 'react';

function NotFound() {
  const [currentTime, setCurrentTime] = useState('');
  const [blinkingCursor, setBlinkingCursor] = useState(true);


  useEffect(() => {
      document.title = "SORRY! page is not available!";
    }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const cursorTimer = setInterval(() => {
      setBlinkingCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div style={{
      fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      backgroundColor: '#282a36',
      color: '#f8f8f2',
      minHeight: '100vh',
      padding: '20px',
      margin: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#44475a',
        borderRadius: '8px 8px 0 0',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ff5555'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#f1fa8c'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#50fa7b'
          }}></div>
        </div>
        
        {/* Terminal Title */}
        <div style={{
          fontSize: '14px',
          color: '#f8f8f2',
          fontWeight: 'bold'
        }}>
          sabina@portfolio: 404 Error
        </div>
        
        {/* Time */}
        <div style={{
          fontSize: '12px',
          color: '#6272a4'
        }}>
          {currentTime}
        </div>
      </div>

      {/* Terminal Body */}
      <div style={{
        backgroundColor: '#282a36',
        padding: '20px',
        minHeight: 'calc(100vh - 80px)',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* ASCII Art 404 */}
        <pre style={{
          color: '#ff5555',
          fontSize: '16px',
          lineHeight: '1.2',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
{`
 ██░ ██  ██▓▄▄▄█████▓▄▄▄█████▓ ██▓███      ▄▄▄      
▓██░ ██▒▓██▒▓  ██▒ ▓▒▓  ██▒ ▓▒▓██░  ██▒   ▒████▄    
▒██▀▀██░▒██▒▒ ▓██░ ▒░▒ ▓██░ ▒░▓██░ ██▓▒   ▒██  ▀█▄  
░▓█ ░██ ░██░░ ▓██▓ ░ ░ ▓██▓ ░ ▒██▄█▓▒ ▒   ░██▄▄▄▄██ 
░▓█▒░██▓░██░  ▒██▒ ░   ▒██▒ ░ ▒██▒ ░  ░    ▓█   ▓██▒
 ▒ ░░▒░▒░▓    ▒ ░░     ▒ ░░   ▒▓▒░ ░  ░    ▒▒   ▓▒█░
 ▒ ░▒░ ░ ▒ ░    ░        ░    ░▒ ░          ▒   ▒▒ ░
 ░  ░░ ░ ▒ ░  ░        ░      ░░            ░   ▒   
 ░  ░  ░ ░                                      ░  ░
`}
        </pre>

        {/* Error Messages */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            color: '#ff5555',
            fontSize: '18px',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#6272a4' }}>sabina@portfolio:~$</span> ls /page-you-requested
          </div>
          <div style={{
            color: '#ff5555',
            marginBottom: '10px'
          }}>
            ls: cannot access '/page-you-requested': No such file or directory
          </div>
          
          <div style={{
            color: '#ff5555',
            fontSize: '18px',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#6272a4' }}>sabina@portfolio:~$</span> whoami
          </div>
          <div style={{
            color: '#50fa7b',
            marginBottom: '20px'
          }}>
            A lost visitor... but that's okay! 🧭
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          border: '2px solid #ff5555',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 85, 85, 0.1)'
        }}>
          <div style={{
            fontSize: '24px',
            color: '#ff5555',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            OOPS! DID YOU GET LOST? 
          </div>
          <div style={{
            fontSize: '16px',
            color: '#f8f8f2',
            marginBottom: '10px'
          }}>
            Error 404: The page you're looking for doesn't exist in this directory.
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6272a4'
          }}>
            But hey, even the best developers hit dead ends sometimes! 💻
          </div>
        </div>

        {/* Available Commands */}
        <div style={{
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: 'rgba(68, 71, 90, 0.3)',
          borderRadius: '8px',
          border: '1px solid #44475a'
        }}>
          <div style={{
            color: '#8be9fd',
            fontSize: '16px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            🛠️ AVAILABLE RESCUE OPERATIONS:
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#6272a4' }}>sabina@portfolio:~$</span>
            <span style={{ color: '#50fa7b', marginLeft: '8px' }}>cd /home</span>
            <span style={{ color: '#f8f8f2', marginLeft: '20px' }}>← Go back to safety</span>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#6272a4' }}>sabina@portfolio:~$</span>
            <span style={{ color: '#50fa7b', marginLeft: '8px' }}>cd ..</span>
            <span style={{ color: '#f8f8f2', marginLeft: '35px' }}>← Go back to previous page</span>
          </div>
          
          <div>
            <span style={{ color: '#6272a4' }}>sabina@portfolio:~$</span>
            <span style={{ color: '#50fa7b', marginLeft: '8px' }}>help</span>
            <span style={{ color: '#f8f8f2', marginLeft: '32px' }}>← Get help navigating</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <button
            onClick={handleGoHome}
            style={{
              backgroundColor: '#50fa7b',
              color: '#282a36',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#5af78e';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#50fa7b';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🏠 cd /home
          </button>
          
          <button
            onClick={handleGoBack}
            style={{
              backgroundColor: 'transparent',
              color: '#8be9fd',
              border: '2px solid #8be9fd',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#8be9fd';
              e.target.style.color = '#282a36';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#8be9fd';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ⬅️ cd ..
          </button>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px'
        }}>
          <div style={{
            color: '#6272a4',
            fontSize: '16px'
          }}>
            <span>sabina@portfolio:~$</span>
            <span style={{ color: '#f1fa8c', marginLeft: '8px' }}>
              echo "Don't worry, we all get lost sometimes! 🗺️"
            </span>
            <span style={{
              color: '#50fa7b',
              opacity: blinkingCursor ? 1 : 0,
              transition: 'opacity 0.1s ease'
            }}>
              █
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;