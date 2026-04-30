import { Route, Switch } from "wouter";
import IPDashboard from './components/IPDashboard';
import { Blog } from './pages/Blog';
import ContactPage from './pages/Contact';
import DisclaimerPage from './pages/Disclaimer';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] selection:bg-blue-500/30 selection:text-blue-200">
      <Switch>
        <Route path="/" component={IPDashboard} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        
        {/* Fallback to Home */}
        <Route>
          <IPDashboard />
        </Route>
      </Switch>
    </div>
  );
}
