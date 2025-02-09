"use client"

import { Card, CardContent, CardHeader } from '@erisfy/shadcnui'

export type Story = {
  title: string
  summary: string
  date: string
  imageUrl?: string
}

interface NewsStoryCardProps {
  story: Story
}

export function NewsStoryCard({ story }: NewsStoryCardProps) {
  return (
    <Card className="h-full">
      {story.imageUrl && (
        <div className="relative w-full pt-[56.25%]">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}
      <CardHeader className="font-semibold">{story.title}</CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">{story.summary}</p>
        <p className="text-sm text-muted-foreground">{story.date}</p>
      </CardContent>
    </Card>
  )
}
