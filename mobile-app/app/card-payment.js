import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Switch } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CardPayment() {
    const router = useRouter();
    const { total } = useLocalSearchParams(); 

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [saveCard, setSaveCard] = useState(false);
    const [errors, setErrors] = useState({});


    const handlePayment = () => {
        let newErrors = {};
        if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        if (!expiry.trim()) newErrors.expiry = 'Expiry date is required';
        if (!cvv.trim()) newErrors.cvv = 'CVV is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        alert('Payment successful!');
       
    };


    return (
        <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#fff" style={{ marginBottom: 16 }} />
            </TouchableOpacity>

            <Text style={styles.title}>Card payment</Text>
            <Text style={styles.subtitle}>Please enter your card details</Text>

            {/* Card Number */}
            <Text style={styles.label}>Card number</Text>
            <TextInput
                placeholder="Enter card number"
                placeholderTextColor="#999"
                style={[styles.input, errors.cardNumber && styles.inputError]}
                keyboardType="numeric"
                maxLength={16}
                onChangeText={(text) => {
                    setCardNumber(text);
                    if (errors.cardNumber) setErrors({ ...errors, cardNumber: null });
                }}
            />
            {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}

            <View style={styles.row}>
                {/* Expiry */}
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.label}>Expiry date</Text>
                    <TextInput
                        placeholder="MM/YY"
                        placeholderTextColor="#999"
                        style={[styles.input, errors.expiry && styles.inputError]}
                        maxLength={5}
                        onChangeText={(text) => {
                            setExpiry(text);
                            if (errors.expiry) setErrors({ ...errors, expiry: null });
                        }}
                    />
                    {errors.expiry && <Text style={styles.errorText}>{errors.expiry}</Text>}
                </View>

                {/* CVV */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>CVV2</Text>
                    <TextInput
                        placeholder="Enter CVV"
                        placeholderTextColor="#999"
                        style={[styles.input, errors.cvv && styles.inputError]}
                        keyboardType="numeric"
                        maxLength={4}
                        secureTextEntry
                        onChangeText={(text) => {
                            setCvv(text);
                            if (errors.cvv) setErrors({ ...errors, cvv: null });
                        }}
                    />
                    {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.push('/booking-confirmation')}
                style={styles.payBtn}
            >
                <Text style={styles.payText}>Pay RM{parseInt(total).toLocaleString()}</Text>
            </TouchableOpacity>


            <View style={styles.checkboxRow}>
                <Switch value={saveCard} onValueChange={setSaveCard} />
                <Text style={styles.checkboxLabel}>Save card info for future transactions</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 16,
    },
    label: {
        color: '#aaa',
        fontSize: 13,
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#222',
        color: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
    },
    payBtn: {
        backgroundColor: '#888',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    payText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkboxLabel: {
        color: '#ccc',
        marginLeft: 8,
        fontSize: 13,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },

});
