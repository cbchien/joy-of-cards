from app import db, lob
from models import User, PostCard


class LobUltilities:
    def generate_sender_address(self):
        try:
            from_address = lob.Address.create(
                name='Mr. Joy',
                company='Joy of Cards Company',
                address_line1='123 Test Avenue',
                address_line2='STE 456',
                address_city='San Francisco',
                address_state='CA',
                address_zip='94107'
            )
            return from_address
        except Exception as e:
            print('Error: ' + str(e))
            print('Failed to create from_address.')
    
    def send_post_card_to(self, userId):
        try:
            from_address = self.generate_sender_address()
            receiver = User.query.filter_by(id=userId).first()

            postcard = lob.Postcard.create(
                to_address={
                    'name':            receiver.name,
                    'address_line1':   receiver.address_line_1,
                    'address_line2':   receiver.address_line_2,
                    'address_city':    receiver.address_city,
                    'address_state':   receiver.address_state,
                    'address_zip':     receiver.address_zip_code,
                    # 'address_country': receiver.address_country
                    'address_country': 'US'

                },
                from_address=from_address,
                size='4x6',
                front='https://s3-us-west-2.amazonaws.com/public.lob.com/assets/pc_4x6_front.pdf',
                back='https://s3-us-west-2.amazonaws.com/public.lob.com/assets/pc_4x6_back.pdf',
            )
            if postcard:
                post_card = PostCard(
                    date_created=postcard.date_created,
                    expected_delivery_date=postcard.expected_delivery_date,
                    post_card_id=postcard.id,
                    receiver_id=userId,
                    send_date=postcard.send_date,
                    url=postcard.url,
                )
                db.session.add(post_card)
                receiver.post_card_received += 1
                db.session.commit()
            return 'Post Card Sent'

        except Exception as e:
            print('Error: ' + str(e))
            print('Failed to send a post card.')