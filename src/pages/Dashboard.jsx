import React from "react";
import { MetricCard, ActivityItem, TickerItem } from "../components/UIComponents.jsx";
import { RevenueChart, ServiceDistributionChart, ClientGrowthChart } from "../components/Charts.jsx";
import { dashboardMetrics, recentActivities, topServices, chartData } from "../data/dashboardData.js";
import { tickerData } from "../data/tickerData.js";

export default function Dashboard() {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-white/90 mt-2">
              Welcome back! Here's what's happening with your AuditDNA platform today.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Last updated</div>
            <div className="text-lg font-semibold">{currentTime}</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={chartData.monthlyRevenue} />
        <ServiceDistributionChart data={chartData.serviceDistribution} />
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="widget">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
              <button className="text-brand-blue hover:text-brand-green text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {recentActivities.slice(0, 5).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Live Tickers */}
        <div className="widget">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Live Market Data</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {tickerData.commodities.slice(0, 4).map((ticker) => (
              <TickerItem key={ticker.symbol} ticker={ticker} />
            ))}
          </div>
          <button className="btn btn-secondary w-full mt-4">
            View All Tickers
          </button>
        </div>
      </div>

      {/* Top Services Performance */}
      <div className="widget">
        <h3 className="text-lg font-semibold mb-6">Top Performing Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topServices.map((service) => (
            <div key={service.id} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage</span>
                  <span className="font-medium">{service.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-brand-green to-brand-blue h-2 rounded-full"
                    style={{ width: `${service.usage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Clients</span>
                  <span className="font-medium">{service.clients}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-medium text-brand-blue">{service.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="widget">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="btn btn-primary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📊</span>
            <span className="text-sm">New Audit</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">👥</span>
            <span className="text-sm">Add Client</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📄</span>
            <span className="text-sm">Upload Docs</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">🔗</span>
            <span className="text-sm">New Partner</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">📈</span>
            <span className="text-sm">View Reports</span>
          </button>
          <button className="btn btn-secondary flex flex-col items-center p-4">
            <span className="text-lg mb-2">⚙️</span>
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
