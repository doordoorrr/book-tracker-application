"use client"

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus } from 'lucide-react'
import '@/styles/globals.css'


export default function BookTracker() {
  useEffect(() => {
    // Timer functionality
    let timerInterval: NodeJS.Timeout
    let startTime: number
    let isTimerRunning = false

    const timerDisplay = document.getElementById('readingTimer')
    const toggleTimerBtn = document.getElementById('toggleTimer')

    function updateTimer() {
      if (!timerDisplay) return
      const currentTime = new Date().getTime()
      const elapsedTime = new Date(currentTime - startTime)
      const hours = elapsedTime.getUTCHours().toString().padStart(2, '0')
      const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0')
      const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0')
      timerDisplay.textContent = `${hours}:${minutes}:${seconds}`
    }

    toggleTimerBtn?.addEventListener('click', () => {
      if (!isTimerRunning) {
        startTime = new Date().getTime()
        timerInterval = setInterval(updateTimer, 1000)
        if (toggleTimerBtn) toggleTimerBtn.textContent = 'End Reading Session'
        isTimerRunning = true
      } else {
        clearInterval(timerInterval)
        if (toggleTimerBtn) toggleTimerBtn.textContent = 'Start Reading Session'
        isTimerRunning = false
      }
    })

    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Book Tracker</h1>
          <p className="text-muted-foreground">Track your reading journey</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Currently Reading</CardTitle>
            <CardDescription>The Midnight Library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge>Fiction</Badge>
                <Badge variant="outline">Kindle</Badge>
              </div>
              <Progress value={45} />
              <p className="text-sm text-muted-foreground">
                Page 148 of 330
              </p>
              <div id="readingTimer" className="text-center text-2xl font-bold">
                00:00:00
              </div>
              <Button className="w-full" id="toggleTimer">
                Start Reading Session
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reading Goals</CardTitle>
            <CardDescription>Your progress this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Weekly Goal</span>
                <span>2/3 books</span>
              </div>
              <Progress value={66} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Monthly Goal</span>
                <span>5/10 books</span>
              </div>
              <Progress value={50} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Books Read</span>
                <span className="text-2xl font-bold">5</span>
              </div>
              <div className="flex justify-between">
                <span>Pages Read</span>
                <span className="text-2xl font-bold">1,250</span>
              </div>
              <div className="flex justify-between">
                <span>Reading Time</span>
                <span className="text-2xl font-bold">24h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Currently Reading</TabsTrigger>
          <TabsTrigger value="tbr">To Be Read</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            {[1, 2].map((book) => (
              <Card key={book}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Book Title {book}
                  </CardTitle>
                  <CardDescription>Author Name</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={30} />
                    <div className="flex gap-2">
                      <Badge>Sci-Fi</Badge>
                      <Badge variant="outline">Audible</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
