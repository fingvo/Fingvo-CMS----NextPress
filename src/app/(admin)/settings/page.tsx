
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
                Manage your site's configuration and preferences.
            </p>
        </div>
        <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
            <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                Update your site's title, tagline, and language.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                <Label htmlFor="site-title">Site Title</Label>
                <Input id="site-title" defaultValue="NextPress" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" defaultValue="A Modern, Open-Source CMS" />
                </div>
                 <div className="space-y-1">
                <Label htmlFor="url">Site URL</Label>
                <Input id="url" defaultValue="https://nextpress.dev" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="writing">
            <Card>
            <CardHeader>
                <CardTitle>Writing Settings</CardTitle>
                <CardDescription>
                Customize your content creation experience.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="markdown-support">Enable Markdown Support</Label>
                        <p className="text-sm text-muted-foreground">
                            Write content using Markdown syntax in the editor.
                        </p>
                    </div>
                    <Switch id="markdown-support" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="revision-history">Enable Revision History</Label>
                        <p className="text-sm text-muted-foreground">
                            Keep a history of changes for posts and pages.
                        </p>
                    </div>
                    <Switch id="revision-history" defaultChecked />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="security">
            <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                Manage security settings for your site.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
                        <p className="text-sm text-muted-foreground">
                            Require 2FA for all admin-level users.
                        </p>
                    </div>
                    <Switch id="2fa" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="auto-updates">Automatic Security Updates</Label>
                        <p className="text-sm text-muted-foreground">
                            Automatically install minor security updates.
                        </p>
                    </div>
                    <Switch id="auto-updates" defaultChecked/>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  )
}
