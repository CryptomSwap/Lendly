import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HEBREW_COPY, formatCurrency } from '@lendly/shared';
import { DepositQuote } from '@lendly/shared';

interface DepositWidgetProps {
  depositQuote: DepositQuote;
  insuranceEnabled: boolean;
  onInsuranceToggle: (enabled: boolean) => void;
}

export default function DepositWidget({
  depositQuote,
  insuranceEnabled,
  onInsuranceToggle,
}: DepositWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900 text-right">
          {HEBREW_COPY.DEPOSIT.TITLE}
        </Text>
        <Text className="text-2xl font-bold text-primary-600">
          {formatCurrency(depositQuote.depositILS)}
        </Text>
      </View>

      {/* Insurance Toggle */}
      <View className="flex-row items-center justify-between mb-3 py-2">
        <Text className="text-base text-gray-700 text-right flex-1">
          {HEBREW_COPY.DEPOSIT.INSURANCE_TOGGLE}
        </Text>
        <Switch
          value={insuranceEnabled}
          onValueChange={onInsuranceToggle}
          trackColor={{ false: '#E5E7EB', true: '#0EA5E9' }}
          thumbColor={insuranceEnabled ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      {/* Deductible */}
      <View className="bg-gray-50 rounded-lg p-3 mb-3">
        <Text className="text-sm text-gray-600 text-right mb-1">
          {HEBREW_COPY.DEPOSIT.DEDUCTIBLE}
        </Text>
        <Text className="text-lg font-semibold text-gray-900 text-right">
          {formatCurrency(depositQuote.deductibleILS)}
        </Text>
      </View>

      {/* Expandable Details */}
      <TouchableOpacity
        className="flex-row items-center justify-between py-2"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text className="text-primary-600 font-medium">
          {HEBREW_COPY.DEPOSIT.WHY_THIS_AMOUNT}
        </Text>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#0EA5E9"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View className="mt-3 pt-3 border-t border-gray-200">
          <Text className="text-sm text-gray-600 text-right mb-3">
            {depositQuote.explanation}
          </Text>
          
          <View className="space-y-2">
            {depositQuote.factors.map((factor, index) => (
              <View key={index} className="flex-row items-start">
                <Text className="text-primary-600 text-sm ml-2">•</Text>
                <Text className="text-sm text-gray-700 text-right flex-1">
                  {factor.description}
                </Text>
                <Text className="text-sm text-gray-500">
                  {factor.impact > 1 ? '+' : ''}{Math.round((factor.impact - 1) * 100)}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
