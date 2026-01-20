interface LoadingState {
  isLoading: boolean;
  message: string;
  requestId: string;
}

class LoadingManager {
  private static instance: LoadingManager;
  private loadingStates: Map<string, LoadingState> = new Map();
  private listeners: Set<(state: LoadingState | null) => void> = new Set();

  static getInstance(): LoadingManager {
    if (!LoadingManager.instance) {
      LoadingManager.instance = new LoadingManager();
    }
    return LoadingManager.instance;
  }

  public showLoading(requestId: string, message: string = 'Loading...'): void {
    const state: LoadingState = { isLoading: true, message, requestId };
    this.loadingStates.set(requestId, state);
    this.notifyListeners(state);
  }

  public hideLoading(requestId: string): void {
    this.loadingStates.delete(requestId);
    const activeState = this.getActiveState();
    this.notifyListeners(activeState);
  }

  private getActiveState(): LoadingState | null {
    if (this.loadingStates.size === 0) return null;
    return Array.from(this.loadingStates.values())[this.loadingStates.size - 1];
  }

  public subscribe(listener: (state: LoadingState | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(state: LoadingState | null): void {
    this.listeners.forEach(listener => listener(state));
  }
}

export default LoadingManager.getInstance();
