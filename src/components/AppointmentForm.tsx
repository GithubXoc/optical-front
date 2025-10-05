import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Appointment } from '../types';
import { Calendar, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react';

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: ''
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Нүдний шинжилгээ',
    'Линз солих',
    'Хүрээ солих',
    'Нүдний эмчилгээ',
    'Зөвлөгөө авах'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAppointment: Appointment = {
      id: Date.now(),
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      service: formData.service,
      status: 'pending'
    };

    setAppointments(prev => [...prev, newAppointment]);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: ''
    });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const isFormValid = formData.customerName && formData.email && formData.phone && 
                     formData.date && formData.time && formData.service;

  return (
    <div className="space-y-6">
      {/* Appointment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Цаг товлох
          </CardTitle>
          <CardDescription>
            Нүдний шинжилгээ, зөвлөгөө авах цаг товлоорой
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Цаг амжилттай товлогдлоо! Бид танд удахгүй холбоо барих болно.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  Овог нэр *
                </label>
                <Input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Таны овог нэр..."
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  Имэйл хаяг *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4" />
                Утасны дугаар *
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+976 99 99 99 99"
                required
              />
            </div>

            {/* Service Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Үйлчилгээний төрөл *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                required
              >
                <option value="">Үйлчилгээ сонгох...</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Огноо *
                </label>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  Цаг *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  required
                >
                  <option value="">Цаг сонгох...</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!isFormValid}
            >
              Цаг товлох
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Appointments */}
      {appointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Сүүлийн товлогдсон цагууд</CardTitle>
            <CardDescription>
              Таны товлогдсон цагуудын жагсаалт
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.slice(-5).reverse().map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{appointment.customerName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.service} | {appointment.date} {appointment.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status === 'pending' ? 'Хүлээгдэж буй' :
                         appointment.status === 'confirmed' ? 'Баталгаажсан' :
                         appointment.status === 'completed' ? 'Дууссан' : 'Цуцлагдсан'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Холбоо барих мэдээлэл</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Байршил</h3>
              <p className="text-sm text-muted-foreground">
                Улаанбаатар хот, Сүхбаатар дүүрэг<br />
                Чингис хааны талбай, Optical Store
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Ажлын цаг</h3>
              <p className="text-sm text-muted-foreground">
                Даваа - Баасан: 09:00 - 18:00<br />
                Бямба: 10:00 - 16:00<br />
                Ням: Амрах өдөр
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentForm;
