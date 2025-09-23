import ServiceStart from "./pages/ServiceStart";
// …
<Routes>
  {/* your other routes */}
  <Route path="/start/:slug" element={<ServiceStart />} />
</Routes>;
