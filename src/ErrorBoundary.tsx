import React from 'react';

type State = { hasError: boolean; error?: Error | null };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(_: Error, __: any) {
    // You could send error info to a logging service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#000',color:'#fff',padding:20,zIndex:9999}}>
          <div style={{maxWidth:800}}>
            <h2 style={{color:'#FFD700'}}>Something went wrong</h2>
            <pre style={{whiteSpace:'pre-wrap',color:'#fff'}}>{String(this.state.error?.message || 'Unknown error')}</pre>
            <div style={{marginTop:12}}>
              <button onClick={() => location.reload()} style={{padding:'8px 12px',background:'#222',color:'#FFD700',border:'1px solid #444'}}>Reload</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}
