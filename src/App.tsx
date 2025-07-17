import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Separator } from './components/ui/separator'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Phone, 
  Tag,
  Clock,
  User,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Brain,
  Heart,
  Eye
} from 'lucide-react'

function App() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

  // Mock data for demonstration
  const transcriptMessages = [
    {
      id: 1,
      speaker: "Sarah (Customer)",
      message: "The biggest pain point for me is that I spend hours every week manually tracking expenses. It's so tedious and error-prone.",
      timestamp: "14:32",
      tags: ["pain-point", "time-consuming"],
      sentiment: "frustrated"
    },
    {
      id: 2,
      speaker: "You",
      message: "That sounds really frustrating. How are you currently handling expense tracking?",
      timestamp: "14:35",
      tags: [],
      sentiment: "neutral"
    },
    {
      id: 3,
      speaker: "Sarah (Customer)",
      message: "I use spreadsheets mostly, but sometimes I forget to log things and then I'm scrambling at month-end. I'd pay good money for something that just works automatically.",
      timestamp: "14:38",
      tags: ["pain-point", "willingness-to-pay", "automation"],
      sentiment: "hopeful"
    }
  ]

  const insights = [
    {
      id: 1,
      type: "pain-point",
      title: "Manual expense tracking",
      confidence: 95,
      alignment: "high",
      timestamp: "14:32",
      evidence: ["Verbal emphasis on 'hours every week'", "Frustrated tone", "Used word 'tedious'"]
    },
    {
      id: 2,
      type: "feature-request",
      title: "Automatic expense logging",
      confidence: 88,
      alignment: "high",
      timestamp: "14:38",
      evidence: ["Direct mention of automation", "Willingness to pay", "Current solution inadequate"]
    }
  ]

  const participants = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Customer",
      avatar: "/api/placeholder/40/40",
      status: "speaking",
      trustScore: 92,
      engagementLevel: "high"
    },
    {
      id: 2,
      name: "You",
      role: "Founder",
      avatar: "/api/placeholder/40/40",
      status: "listening",
      trustScore: null,
      engagementLevel: null
    }
  ]

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Customer Interview</h1>
            <p className="text-sm text-slate-600">Sarah Chen • Product Manager at TechCorp</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>23:45</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Recording
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Main Video */}
          <div className="flex-1 bg-slate-900 relative">
            {/* Simulated video background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg opacity-75">Video Call Active</p>
              </div>
            </div>

            {/* Participant Thumbnails */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {participants.map((participant) => (
                <div key={participant.id} className="relative">
                  <div className={`w-24 h-18 bg-slate-800 rounded-lg border-2 ${
                    participant.status === 'speaking' ? 'border-green-400' : 'border-slate-600'
                  } flex items-center justify-center`}>
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-slate-700 text-white">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* AI Indicators */}
                  {participant.trustScore && (
                    <div className="absolute -bottom-1 -right-1 flex gap-1">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 px-1 py-0">
                        <Brain className="w-3 h-3 mr-1" />
                        {participant.trustScore}%
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute -bottom-6 left-0 right-0 text-center">
                    <p className="text-xs text-white font-medium">{participant.name.split(' ')[0]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Insight Overlay */}
            {selectedInsight && (
              <div className="absolute bottom-20 left-4 right-4">
                <Card className="bg-white/95 backdrop-blur-sm p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">Pain Point Detected</h4>
                      <p className="text-sm text-slate-600 mt-1">Manual expense tracking causing frustration</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">95% confidence</Badge>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">High alignment</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedInsight(null)}
                    >
                      ×
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="bg-white border-t border-slate-200 p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full w-12 h-12"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                variant={!isVideoOn ? "destructive" : "outline"}
                size="lg"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-full w-12 h-12"
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>
              
              <Button
                variant={isScreenSharing ? "default" : "outline"}
                size="lg"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className="rounded-full w-12 h-12"
              >
                <Monitor className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                onClick={() => setSelectedInsight('pain-point-1')}
              >
                <Tag className="w-5 h-5" />
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full w-12 h-12"
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white border-l border-slate-200 flex flex-col">
          {/* Transcription Panel */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Live Transcription</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {transcriptMessages.map((msg) => (
                <div key={msg.id} className="group">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className={`text-xs ${
                        msg.speaker.includes('Customer') ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {msg.speaker.includes('Customer') ? 'C' : 'Y'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-slate-900">{msg.speaker}</p>
                        <span className="text-xs text-slate-500">{msg.timestamp}</span>
                        {msg.sentiment === 'frustrated' && (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        {msg.sentiment === 'hopeful' && (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-700 leading-relaxed">{msg.message}</p>
                      
                      {msg.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {msg.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className={`text-xs ${
                                tag === 'pain-point' ? 'bg-red-100 text-red-700' :
                                tag === 'willingness-to-pay' ? 'bg-green-100 text-green-700' :
                                'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights Panel */}
          <div className="border-t border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">AI Insights</h3>
            </div>
            
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {insights.map((insight) => (
                <Card key={insight.id} className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.alignment === 'high' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-slate-900">{insight.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}%
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-slate-600 mb-2">
                        {insight.timestamp} • {insight.type.replace('-', ' ')}
                      </p>
                      
                      <div className="space-y-1">
                        {insight.evidence.slice(0, 2).map((evidence, idx) => (
                          <p key={idx} className="text-xs text-slate-500 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {evidence}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline at bottom */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-700">Timeline</span>
          <div className="flex-1 relative h-2 bg-slate-200 rounded-full">
            <div className="absolute left-1/4 w-3 h-3 bg-red-500 rounded-full -top-0.5 cursor-pointer hover:scale-110 transition-transform" 
                 title="Pain point identified" />
            <div className="absolute left-2/3 w-3 h-3 bg-green-500 rounded-full -top-0.5 cursor-pointer hover:scale-110 transition-transform" 
                 title="Strong product alignment" />
            <div className="absolute left-0 w-1 h-2 bg-blue-500 rounded-full" />
          </div>
          <span className="text-sm text-slate-500">23:45</span>
        </div>
      </div>
    </div>
  )
}

export default App