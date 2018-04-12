import {Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Article} from '../article.interface';
import {unwrapCollectionSnapshotChanges} from '../firestore.helper';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  articles$ = this.db.collection<Article>('articles').snapshotChanges().pipe(map(unwrapCollectionSnapshotChanges));

  constructor(private db: AngularFirestore,
              private seo: Meta,
              private title: Title) {
    this.title.setTitle(`@spy4x Blog - Articles`);
    this.seo.addTags([
      {name: 'author', content: 'Anton Shubin'},
      {name: 'keywords', content: 'angular,universal,ssr,firebase,spy4x'},
      {
        name: 'description',
        content: 'Angular Server-side rendering app running on Firebase Hosting'
      },

      // Twitter card
      {
        name: 'twitter:card',
        content: '@spy4x Blog - Articles'
      },
      {
        name: 'twitter:site',
        content: 'https://sp-ng-blog.firebaseapp.com'
      },
      {
        name: 'twitter:title',
        content: 'Angular SSR App by @spy4x'
      },
      {
        name: 'twitter:description',
        content: 'Angular Server-side rendering app running on Firebase Hosting'
      },
      {
        name: 'twitter:creator',
        content: '@spy4x'
      },
      {
        name: 'twitter:image',
        content: 'https://avatars3.githubusercontent.com/u/4995814?s=300'
      },

      // Open Graph
      {
        property: 'og:title',
        content: '@spy4x Blog - Articles'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'https://sp-ng-blog.firebaseapp.com'
      },
      {
        property: 'og:image',
        content: 'https://avatars3.githubusercontent.com/u/4995814?s=300'
      },
      {
        property: 'og:image:alt',
        content: 'Anton Shubin avatar'
      },
      {
        property: 'og:description',
        content: '@spy4x blog about technologies and stuff'
      },
      {
        property: 'og:site_name',
        content: '@spy4x Blog'
      },
    ]);
  }

}
