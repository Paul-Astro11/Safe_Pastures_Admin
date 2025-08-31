import 'package:flutter/material.dart';

class PaymentsScreen extends StatefulWidget {
  const PaymentsScreen({super.key});

  @override
  State<PaymentsScreen> createState() => _PaymentsScreenState();
}

class _PaymentsScreenState extends State<PaymentsScreen> {
  String selectedPeriod = 'This Month';
  final List<String> periods = ['This Week', 'This Month', 'Last Month', 'This Year'];

  final List<Map<String, dynamic>> payments = [
    {
      'id': 'PAY-2024-001',
      'type': 'Premium Payment',
      'customerName': 'Sarah Johnson',
      'petName': 'Buddy',
      'amount': '\$89.99',
      'status': 'Completed',
      'date': '2024-01-17',
      'method': 'Credit Card',
      'reference': '****1234',
    },
    {
      'id': 'PAY-2024-002',
      'type': 'Claim Payout',
      'customerName': 'Mike Chen',
      'petName': 'Whiskers',
      'amount': '\$385.50',
      'status': 'Processing',
      'date': '2024-01-16',
      'method': 'Bank Transfer',
      'reference': 'ACH-789456',
    },
    {
      'id': 'PAY-2024-003',
      'type': 'Premium Payment',
      'customerName': 'Emma Davis',
      'petName': 'Luna',
      'amount': '\$75.25',
      'status': 'Failed',
      'date': '2024-01-15',
      'method': 'Credit Card',
      'reference': '****5678',
    },
    {
      'id': 'PAY-2024-004',
      'type': 'Refund',
      'customerName': 'Robert Wilson',
      'petName': 'Max',
      'amount': '\$95.00',
      'status': 'Pending',
      'date': '2024-01-14',
      'method': 'Original Payment Method',
      'reference': 'REF-123789',
    },
  ];

  Color _getStatusColor(String status) {
    switch (status) {
      case 'Completed':
        return Colors.green;
      case 'Failed':
        return Colors.red;
      case 'Processing':
        return Colors.blue;
      case 'Pending':
      default:
        return Colors.orange;
    }
  }

  IconData _getPaymentIcon(String type) {
    switch (type) {
      case 'Premium Payment':
        return Icons.payment;
      case 'Claim Payout':
        return Icons.money;
      case 'Refund':
        return Icons.money_off;
      default:
        return Icons.account_balance_wallet;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Payments & Transactions',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.download),
                  label: const Text('Export'),
                ),
              ],
            ),
            const SizedBox(height: 16),

            SizedBox(
              height: 150,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _buildFinancialCard('Total Revenue', '\$45,230', '+12.5%', Colors.green, Icons.trending_up),
                  _buildFinancialCard('Pending Payouts', '\$8,450', '15 claims', Colors.orange, Icons.hourglass_empty),
                  _buildFinancialCard('Failed Payments', '\$1,250', '3 transactions', Colors.red, Icons.error),
                  _buildFinancialCard('Monthly Growth', '+18.2%', 'vs last month', Colors.blue, Icons.show_chart),
                ],
              ),
            ),
            const SizedBox(height: 16),

            Row(
              children: [
                const Text('Period: ', style: TextStyle(fontWeight: FontWeight.w500)),
                DropdownButton<String>(
                  value: selectedPeriod,
                  items: periods.map((period) {
                    return DropdownMenuItem(
                      value: period,
                      child: Text(period),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      selectedPeriod = value!;
                    });
                  },
                ),
                const Spacer(),
                TextButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.filter_list),
                  label: const Text('Filters'),
                ),
              ],
            ),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: payments.length,
                itemBuilder: (context, index) {
                  final payment = payments[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ListTile(
                      contentPadding: const EdgeInsets.all(16),
                      leading: CircleAvatar(
                        backgroundColor: _getStatusColor(payment['status']).withOpacity(0.1),
                        child: Icon(
                          _getPaymentIcon(payment['type']),
                          color: _getStatusColor(payment['status']),
                        ),
                      ),
                      title: Text(
                        payment['type'],
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('${payment['customerName']} - ${payment['petName']}'),
                          Text('Payment ID: ${payment['id']}'),
                          Text('${payment['method']} • ${payment['reference']}'),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: _getStatusColor(payment['status']).withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  payment['status'],
                                  style: TextStyle(
                                    color: _getStatusColor(payment['status']),
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const Spacer(),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(
                                    payment['amount'],
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16,
                                    ),
                                  ),
                                  Text(
                                    payment['date'],
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                      trailing: PopupMenuButton(
                        itemBuilder: (context) => [
                          const PopupMenuItem(
                            value: 'view',
                            child: Text('View Details'),
                          ),
                          const PopupMenuItem(
                            value: 'refund',
                            child: Text('Process Refund'),
                          ),
                          const PopupMenuItem(
                            value: 'retry',
                            child: Text('Retry Payment'),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFinancialCard(String title, String value, String subtitle, Color color, IconData icon) {
    return Container(
      width: 180,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 20),
              const Spacer(),
              Text(
                title,
                style: TextStyle(
                  fontSize: 12,
                  color: color,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 11,
              color: color.withOpacity(0.7),
            ),
          ),
        ],
      ),
    );
  }
}
