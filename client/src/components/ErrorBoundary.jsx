import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // يحدث قبل render لو حصل خطأ
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // ممكن تحط هنا لوج أو تتبع الأخطاء
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // هنا نستقبل fallback من props ونستخدمه
      return this.props.fallback || (
        <div style={{ padding: "1rem", textAlign: "center", color: "red" }}>
          <h2>حدث خطأ ما في هذا الجزء من التطبيق.</h2>
          <button onClick={() => window.location.reload()}>إعادة تحميل الصفحة</button>
        </div>
      );
    }

    // إذا ما في خطأ، نعرض الأبناء العاديين
    return this.props.children;
  }
}

export default ErrorBoundary;
