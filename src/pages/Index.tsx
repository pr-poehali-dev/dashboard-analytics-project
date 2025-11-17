import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  gradient 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: string; 
  gradient: string;
}) => {
  const isPositive = change.startsWith('+');
  
  return (
    <Card className="p-6 glass-effect hover:scale-[1.02] transition-transform duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${gradient}`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
        <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {change}
        </div>
      </div>
      <h3 className="text-muted-foreground text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </Card>
  );
};

const SourceRow = ({ 
  name, 
  visitors, 
  conversion, 
  revenue 
}: { 
  name: string; 
  visitors: string; 
  conversion: string; 
  revenue: string;
}) => {
  const conversionValue = parseFloat(conversion);
  
  return (
    <div className="grid grid-cols-4 gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="font-medium">{name}</div>
      <div className="text-muted-foreground">{visitors}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full gradient-green transition-all duration-500" 
            style={{ width: `${conversionValue}%` }}
          />
        </div>
        <span className="text-sm font-semibold">{conversion}</span>
      </div>
      <div className="font-semibold text-right">{revenue}</div>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const metrics = [
    {
      title: 'Общая выручка',
      value: '₽2,847,392',
      change: '+12.5%',
      icon: 'TrendingUp',
      gradient: 'gradient-green'
    },
    {
      title: 'Средний чек',
      value: '₽4,235',
      change: '+8.2%',
      icon: 'DollarSign',
      gradient: 'gradient-green-light'
    },
    {
      title: 'Количество продаж',
      value: '672',
      change: '+15.7%',
      icon: 'ShoppingCart',
      gradient: 'gradient-green-dark'
    },
    {
      title: 'Конверсия',
      value: '3.8%',
      change: '-2.1%',
      icon: 'Target',
      gradient: 'gradient-green'
    }
  ];

  const sources = [
    { name: 'Яндекс Директ', visitors: '12,482', conversion: '4.2%', revenue: '₽524,944' },
    { name: 'Google Ads', visitors: '8,743', conversion: '3.9%', revenue: '₽340,777' },
    { name: 'Органический поиск', visitors: '15,234', conversion: '5.1%', revenue: '₽776,934' },
    { name: 'Социальные сети', visitors: '6,892', conversion: '2.8%', revenue: '₽193,776' },
    { name: 'Email рассылка', visitors: '4,123', conversion: '6.3%', revenue: '₽259,749' }
  ];

  const salesData = [
    { day: 'Пн', value: 65 },
    { day: 'Вт', value: 78 },
    { day: 'Ср', value: 90 },
    { day: 'Чт', value: 72 },
    { day: 'Пт', value: 85 },
    { day: 'Сб', value: 95 },
    { day: 'Вс', value: 88 }
  ];

  const maxValue = Math.max(...salesData.map(d => d.value));

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Дашборд аналитики
            </h1>
            <p className="text-muted-foreground">Мониторинг ключевых показателей в реальном времени</p>
          </div>
          <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow"></div>
            <span className="text-sm font-medium">Live</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-fit bg-muted/50 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:gradient-green data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:gradient-green data-[state=active]:text-white">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Метрики
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:gradient-green data-[state=active]:text-white">
              <Icon name="LineChart" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:gradient-green data-[state=active]:text-white">
              <Icon name="Globe" size={16} className="mr-2" />
              Источники
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={metric.title} style={{ animationDelay: `${index * 100}ms` }}>
                  <MetricCard {...metric} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 glass-effect animate-fade-in">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Динамика продаж за неделю
                </h2>
                <div className="flex items-end gap-4 h-64">
                  {salesData.map((data, index) => (
                    <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative" style={{ height: '200px' }}>
                        <div 
                          className="w-full gradient-green rounded-t-lg absolute bottom-0 hover:opacity-80 transition-opacity cursor-pointer animate-slide-in-right"
                          style={{ 
                            height: `${(data.value / maxValue) * 100}%`,
                            animationDelay: `${index * 50}ms`
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-semibold bg-emerald-500/20 px-2 py-1 rounded">
                            {data.value}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">{data.day}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 glass-effect animate-fade-in">
                <h3 className="text-lg font-bold mb-4">ROI по каналам</h3>
                <div className="space-y-3">
                  {['Email: 340%', 'Органика: 280%', 'Яндекс: 210%', 'Google: 185%'].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-full gradient-green-dark rounded-full transition-all duration-500"
                          style={{ width: `${(4 - index) * 25}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={metric.title} style={{ animationDelay: `${index * 100}ms` }}>
                  <MetricCard {...metric} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 glass-effect animate-fade-in">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="Users" size={18} />
                  Новые клиенты
                </h3>
                <div className="text-4xl font-bold mb-2">248</div>
                <div className="text-sm text-green-400">+23% к прошлой неделе</div>
              </Card>

              <Card className="p-6 glass-effect animate-fade-in">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="Repeat" size={18} />
                  Повторные покупки
                </h3>
                <div className="text-4xl font-bold mb-2">34%</div>
                <div className="text-sm text-green-400">+5% к прошлой неделе</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Card className="p-6 glass-effect animate-fade-in">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Icon name="LineChart" size={20} />
                Динамика продаж за неделю
              </h2>
              <div className="flex items-end gap-4 h-64">
                {salesData.map((data, index) => (
                  <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative" style={{ height: '200px' }}>
                      <div 
                        className="w-full gradient-green-light rounded-t-lg absolute bottom-0 hover:opacity-80 transition-opacity cursor-pointer animate-slide-in-right"
                        style={{ 
                          height: `${(data.value / maxValue) * 100}%`,
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-semibold bg-emerald-500/20 px-2 py-1 rounded">
                          {data.value}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">{data.day}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 glass-effect animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Отказы</h3>
                  <Icon name="XCircle" size={16} className="text-red-400" />
                </div>
                <div className="text-2xl font-bold">24.3%</div>
              </Card>

              <Card className="p-6 glass-effect animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Время на сайте</h3>
                  <Icon name="Clock" size={16} className="text-blue-400" />
                </div>
                <div className="text-2xl font-bold">4:32</div>
              </Card>

              <Card className="p-6 glass-effect animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Страниц за визит</h3>
                  <Icon name="FileText" size={16} className="text-purple-400" />
                </div>
                <div className="text-2xl font-bold">5.7</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6 mt-6">
            <Card className="p-6 glass-effect animate-fade-in">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Globe" size={20} />
                Источники трафика
              </h2>
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-4 p-4 text-sm text-muted-foreground font-semibold border-b border-border">
                  <div>Источник</div>
                  <div>Посетители</div>
                  <div>Конверсия</div>
                  <div className="text-right">Выручка</div>
                </div>
                {sources.map((source, index) => (
                  <div key={source.name} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <SourceRow {...source} />
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 glass-effect animate-fade-in">
                <h3 className="text-lg font-bold mb-4">ROI по каналам</h3>
                <div className="space-y-3">
                  {['Email: 340%', 'Органика: 280%', 'Яндекс: 210%', 'Google: 185%'].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-full gradient-green-dark rounded-full transition-all duration-500"
                          style={{ width: `${(4 - index) * 25}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 glass-effect animate-fade-in">
                <h3 className="text-lg font-bold mb-4">География</h3>
                <div className="space-y-3">
                  {[
                    { city: 'Москва', percent: '42%' },
                    { city: 'Санкт-Петербург', percent: '28%' },
                    { city: 'Казань', percent: '15%' },
                    { city: 'Новосибирск', percent: '15%' }
                  ].map((item) => (
                    <div key={item.city} className="flex items-center justify-between">
                      <span className="text-sm">{item.city}</span>
                      <span className="text-sm font-semibold">{item.percent}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;