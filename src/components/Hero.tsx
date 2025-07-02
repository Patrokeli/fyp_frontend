import React, { useEffect } from 'react';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';

export function Hero() {
  // Fiber optic cable animation effect
  useEffect(() => {
    const canvas = document.getElementById('fiberCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 300;

    const points = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.2 + Math.random() * 0.8,
      radius: 1 + Math.random() * 2,
      color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      points.forEach(point => {
        ctx.beginPath();
        ctx.moveTo(point.x, 0);
        ctx.lineTo(point.x, canvas.height);
        
        const gradient = ctx.createLinearGradient(point.x, 0, point.x, canvas.height);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.3, point.color);
        gradient.addColorStop(0.7, point.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = point.radius;
        ctx.globalAlpha = 0.15;
        ctx.stroke();
        
        point.x += point.speed;
        if (point.x > canvas.width) point.x = 0;
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated fiber background */}
      <canvas 
        id="fiberCanvas" 
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Glowing dots animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in">
              <Zap className="h-5 w-5 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-sm font-medium">Fastest Internet in Tanzania</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight animate-slide-up">
              Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Fiber Internet Provider</span> in Tanzania
            </h1>
            
            <p className="text-xl text-blue-100 opacity-90 max-w-lg animate-slide-up delay-100">
              Compare plans, prices, and coverage from Zuku, TTCL, SimbaNet, YAS Fiber, Savannah, and more in one place.
            </p>
            
            <div className="flex gap-4 animate-slide-up delay-200">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span>Compare Providers</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium border border-white/20 transition-all duration-300">
                <span>View Coverage</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4 animate-slide-up delay-300">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-orange-500/20 animate-pulse">
                  <CheckCircle className="h-5 w-5 text-orange-400" />
                </div>
                <span className="text-sm font-medium">Compare 6+ providers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-blue-500/20 animate-pulse delay-100">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-sm font-medium">Transparent pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-purple-500/20 animate-pulse delay-200">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-sm font-medium">Easy subscription</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block z-10">
            <div className="absolute -top-6 -right-6 w-full h-full rounded-2xl border-2 border-orange-400/20 -z-10 animate-float"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-600/10 backdrop-blur-sm z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full bg-orange-500/10 border-2 border-orange-400/30 animate-ping-slow"></div>
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-400/20 to-pink-500/20 animate-spin-slow">
                    <div className="absolute inset-4 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
                      <Zap className="h-16 w-16 text-orange-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1581092921461-eab10380ed37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Family enjoying fast internet" 
                className="relative z-0 w-full h-auto" 
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-gray-900 to-orange-900 p-6 rounded-2xl shadow-xl text-white border border-orange-400/20 animate-float-delay">
              <div className="text-2xl font-bold text-orange-400">100Mbps</div>
              <div className="text-sm text-orange-200">Average Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}