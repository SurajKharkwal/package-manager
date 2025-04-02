
"use client";

import { useUser } from "@clerk/nextjs";
import { CalendarIcon, Globe, Mail, MapPin, Phone, User, Clock, Loader } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="animate-spin text-4xl text-muted-foreground"><Loader /></span>
      </div>
    );
  }

  if (!user) throw new Error("Un Authorized user")

  const fullName: string = user.fullName || "N/A";
  const email: string = user.primaryEmailAddress?.emailAddress || "N/A";
  const phoneNumber: string = user.primaryPhoneNumber?.phoneNumber || "N/A";
  const username: string = user.username || "N/A";
  const bio: string = (user.publicMetadata?.bio as string) || "No bio available.";
  const location: string = (user.publicMetadata?.location as string) || "N/A";
  const website: string = (user.publicMetadata?.website as string) || "N/A";
  const createdAt: string = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";
  const lastSignIn: string = user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : "N/A";
  const profileImage: string = user.imageUrl;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* GitHub-Style Profile Header */}
      <div className="bg-muted shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-primary shadow-md"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-card-foreground">{fullName}</h2>
          <p className="text-muted-foreground">@{username}</p>
          <p className="text-muted-foreground mt-2">{bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ProfileDetail icon={User} label="Full Name" value={fullName} />
        <ProfileDetail icon={Mail} label="Email" value={email} />
        <ProfileDetail icon={Phone} label="Phone Number" value={phoneNumber} />
        <ProfileDetail icon={MapPin} label="Location" value={location} />
        <ProfileDetail icon={Globe} label="Website" value={website} />
        <ProfileDetail icon={CalendarIcon} label="Joined On" value={createdAt} />
        <ProfileDetail icon={Clock} label="Last Sign-in" value={lastSignIn} />
      </div>
    </div>
  );
}

function ProfileDetail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 bg-muted p-4 rounded-lg shadow-md">
      <Icon className="text-muted-foreground w-5 h-5" />
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold text-card-foreground">{value}</span>
      </div>
    </div>
  );
}
