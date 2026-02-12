
import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Globe, 
  ChevronRight, 
  Linkedin, 
  Twitter, 
  Facebook,
  ShieldCheck,
  ArrowRight,
  Info,
  Zap,
  Building2,
  Headphones,
  MessageCircle
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import ModernSelect from '../components/ModernSelect';
import LegalWarning from '../components/LegalWarning';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'pret',
    