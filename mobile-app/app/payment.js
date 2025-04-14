import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';


export default function Payment() {
    const router = useRouter();
    const { subtotal } = useLocalSearchParams();

    const paymentOptions = [
        {
            title: 'Debit card',
            subtitle: 'Pay with',
            icon: <FontAwesome name="credit-card" size={20} color="#fff" />,
            extra: <FontAwesome name="cc-visa" size={24} color="#fff" />,
        },
        {
            title: 'Bank Transfer',
            subtitle: 'Make a transfer from your bank account',
            icon: <Ionicons name="ios-bank-outline" size={20} color="#fff" />,
        },
        {
            title: 'Crypto wallets',
            subtitle: 'Pay from your cryptocurrency wallet',
            icon: <MaterialIcons name="currency-bitcoin" size={24} color="#fff" />,
        },
    ];

    return (
        <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#fff" style={{ marginBottom: 16 }} />
            </TouchableOpacity>

            <Text style={styles.title}>Payment</Text>
            <Text style={styles.subtitle}>How would you like to make the payment? Kindly select your preferred option</Text>

            {paymentOptions.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => {
                        router.push({
                            pathname: '/card-payment',
                            params: { total: subtotal },
                        });
                    }}
                >
                    <View style={styles.leftIcon}>{option.icon}</View>
                    <View style={styles.info}>
                        <Text style={styles.cardTitle}>{option.title}</Text>
                        <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                    </View>
                    <View style={styles.rightIcon}>
                        {option.extra}
                        <Ionicons name="chevron-forward" size={20} color="#aaa" />
                    </View>
                </TouchableOpacity>
            ))}
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
        marginBottom: 8,
    },
    subtitle: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#111',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
    },
    leftIcon: {
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cardSubtitle: {
        color: '#aaa',
        fontSize: 12,
    },
    rightIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
