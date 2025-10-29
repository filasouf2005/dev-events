'use client';

import { useState } from 'react';
import { X, Plus, Calendar, MapPin, Image, Clock, Tag, Users, Building2, Globe } from 'lucide-react';

export default function CreateEventPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [audience, setAudience] = useState('');
    const [mode, setMode] = useState('offline');
    const [time, setTime] = useState('');
    const [venue, setVenue] = useState('');
    const [overview, setOverview] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [agenda, setAgenda] = useState<{ time: string; topic: string }[]>([]);
    const [newTag, setNewTag] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const addAgendaItem = () => {
        setAgenda([...agenda, { time: '', topic: '' }]);
    };

    const removeAgendaItem = (index: number) => {
        setAgenda(agenda.filter((_, i) => i !== index));
    };

    const handleAgendaChange = (i: number, field: string, value: string) => {
        const updated = [...agenda];
        updated[i] = { ...updated[i], [field]: value };
        setAgenda(updated);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setMessage('⚠️ Please select an image.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('organizer', organizer);
            formData.append('audience', audience);
            formData.append('mode', mode);
            formData.append('time', time);
            formData.append('venue', venue);
            formData.append('overview', overview);
            formData.append('location', location);
            formData.append('date', date);
            formData.append('image', image);
            formData.append('tags', JSON.stringify(tags));
            formData.append(
                'agenda',
                JSON.stringify(agenda.map(item => `${item.time} - ${item.topic}`))
            );

            const res = await fetch('/api/events', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('✅ Event created successfully!');
                setTitle('');
                setDescription('');
                setOrganizer('');
                setAudience('');
                setMode('offline');
                setTime('');
                setVenue('');
                setOverview('');
                setLocation('');
                setDate('');
                setTags([]);
                setAgenda([]);
                setImage(null);
                setImagePreview('');
            } else {
                setMessage(`❌ Failed: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('⚠️ Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4 backdrop-blur-sm">
                        <span className="text-5xl">🎉</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Create New Event
                    </h1>
                    <p className="text-gray-400 text-lg">Fill in the details to create an amazing event</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 md:p-10">
                    <div className="space-y-8">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                Event Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter event title..."
                                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                placeholder="Describe your event in detail..."
                                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500 resize-none"
                            />
                        </div>

                        {/* Organizer & Audience */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    Organizer
                                </label>
                                <input
                                    type="text"
                                    value={organizer}
                                    onChange={(e) => setOrganizer(e.target.value)}
                                    placeholder="Who's organizing this?"
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    Target Audience
                                </label>
                                <input
                                    type="text"
                                    value={audience}
                                    onChange={(e) => setAudience(e.target.value)}
                                    placeholder="e.g. Students, Developers..."
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500"
                                />
                            </div>
                        </div>

                        {/* Mode, Time, Venue */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <Globe className="w-4 h-4 text-blue-400" />
                                    Mode
                                </label>
                                <select
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white"
                                >
                                    <option value="offline" className="bg-gray-900">offline</option>
                                    <option value="online" className="bg-gray-900">Online</option>
                                    <option value="hybrid" className="bg-gray-900">Hybrid</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    Time
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <Building2 className="w-4 h-4 text-blue-400" />
                                    Venue
                                </label>
                                <input
                                    type="text"
                                    value={venue}
                                    onChange={(e) => setVenue(e.target.value)}
                                    placeholder="Venue name..."
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500"
                                />
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                Overview
                            </label>
                            <textarea
                                value={overview}
                                onChange={(e) => setOverview(e.target.value)}
                                rows={3}
                                placeholder="Brief overview of the event..."
                                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500 resize-none"
                            />
                        </div>

                        {/* Location & Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Event location..."
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white"
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                <Tag className="w-4 h-4 text-blue-400" />
                                Tags
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="e.g. hackathon, workshop..."
                                    className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-2xl text-white font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    {tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="group px-4 py-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl text-sm font-medium text-white border border-blue-400/30 flex items-center gap-2 hover:from-blue-500/40 hover:to-purple-500/40 transition-all"
                                        >
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(i)}
                                                className="opacity-60 hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Agenda */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    Agenda
                                </label>
                                <button
                                    type="button"
                                    onClick={addAgendaItem}
                                    className="flex items-center gap-2 text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add item
                                </button>
                            </div>
                            <div className="space-y-3">
                                {agenda.map((item, i) => (
                                    <div
                                        key={i}
                                        className="group relative grid grid-cols-[auto,1fr,auto] gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                                    >
                                        <input
                                            type="time"
                                            value={item.time}
                                            onChange={(e) => handleAgendaChange(i, 'time', e.target.value)}
                                            className="p-3 rounded-xl bg-white/10 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Topic or activity..."
                                            value={item.topic}
                                            onChange={(e) => handleAgendaChange(i, 'topic', e.target.value)}
                                            className="p-3 rounded-xl bg-white/10 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-white placeholder-gray-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeAgendaItem(i)}
                                            className="p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                {agenda.length === 0 && (
                                    <div className="text-center py-8 text-gray-500 text-sm">
                                        No agenda items yet. Click "+ Add item" to start.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 uppercase tracking-wide">
                                <Image className="w-4 h-4 text-blue-400" />
                                Event Image
                            </label>
                            <div className="relative">
                                {imagePreview ? (
                                    <div className="relative group">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-64 object-cover rounded-2xl border border-white/10"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-2xl flex items-center justify-center">
                                            <label className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold cursor-pointer transition-all">
                                                Change Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-blue-400/50 transition-all group">
                                        <Image className="w-12 h-12 text-gray-400 group-hover:text-blue-400 transition-colors mb-3" />
                                        <span className="text-gray-400 group-hover:text-blue-400 font-medium">
                                            Click to upload image
                                        </span>
                                        <span className="text-gray-500 text-sm mt-2">PNG, JPG up to 10MB</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="group relative w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 transition-all text-white font-bold text-lg shadow-2xl shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating Event...
                                    </span>
                                ) : (
                                    'Create Event'
                                )}
                            </span>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                        </button>

                        {/* Message */}
                        {message && (
                            <div
                                className={`p-4 rounded-2xl text-center font-medium ${
                                    message.includes('✅')
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}
                            >
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}